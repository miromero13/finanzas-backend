import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { AssetsEntity } from '../entities/assets.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrentAssetsEntity } from '../entities/current-assets.entity';
import { FixedAssetsEntity } from '../entities/fixed-assets.entity';
import { DeferredAssetsEntity } from '../entities/deferred-assets.entity';
import { AvailableAssetsEntity } from '../entities/available-assets.entity';
import { DemandableAssetsEntity } from '../entities/demandable-assets.entity';
import { RealizableAssetsEntity } from '../entities/realizable-assets.entity';
import { UsersService } from 'src/users/services/users.service';
import { CreateAssetsDto } from '../dto/create-assets.dto';
import { handlerError } from 'src/common/utils/handler-error.utils';
import { LiabilitiesEquityEntity } from '../entities/liabilities-equity.entity';
import { CurrentLiabilitiesEntity } from '../entities/current-liabilities.entity';
import { FixedLiabilitiesEntity } from '../entities/fixed-liabilities.entity';
import { EquityEntity } from '../entities/equity.entity';
import { CreateLiabilitiesEquityDto } from '../dto/create-liabilities.dto';
import { CreateBalanceDto } from '../dto/create-balance.dto';
import { BALANCE_TYPE } from 'src/common/constants/type';
import { BalanceEntity } from '../entities/balance.entity';

@Injectable()
export class BalanceService {
  private readonly logger = new Logger();
  constructor(
    @InjectRepository(BalanceEntity)
    private readonly balanceRepository: Repository<BalanceEntity>,
    @InjectRepository(AssetsEntity)
    private readonly assetRepository: Repository<AssetsEntity>,
    @InjectRepository(CurrentAssetsEntity)
    private readonly currentAssetsRepository: Repository<CurrentAssetsEntity>,
    @InjectRepository(FixedAssetsEntity)
    private readonly fixedAssetsRepository: Repository<FixedAssetsEntity>,
    @InjectRepository(DeferredAssetsEntity)
    private readonly deferredAssetsRepository: Repository<DeferredAssetsEntity>,
    @InjectRepository(AvailableAssetsEntity)
    private readonly availableAssetsRepository: Repository<AvailableAssetsEntity>,
    @InjectRepository(DemandableAssetsEntity)
    private readonly demandableAssetsRepository: Repository<DemandableAssetsEntity>,
    @InjectRepository(RealizableAssetsEntity)
    private readonly realizableAssetsRepository: Repository<RealizableAssetsEntity>,
    @InjectRepository(LiabilitiesEquityEntity)
    private readonly liabilitiesEquityRepository: Repository<LiabilitiesEquityEntity>,
    @InjectRepository(CurrentLiabilitiesEntity)
    private readonly currentLiabilitiesRepository: Repository<CurrentLiabilitiesEntity>,
    @InjectRepository(FixedLiabilitiesEntity)
    private readonly fixedLiabilitiesRepository: Repository<FixedLiabilitiesEntity>,
    @InjectRepository(EquityEntity)
    private readonly equityRepository: Repository<EquityEntity>,
    private readonly userService: UsersService,
  ) {}

  public async createBalance(
    createBalanceDto: CreateBalanceDto,
    userId: string,
  ) {
    try {
      const user = await this.userService.findOne(userId);
      if (!user) throw new NotFoundException('Usuario no encontrado');

      const { assets, liabilitiesEquity, ...rest } = createBalanceDto;
      const assetCreated = await this.createAssets(assets);
      const liabilityCreated =
        await this.createLiabilitiesEquity(liabilitiesEquity);
      const balance = this.balanceRepository.create({
        ...rest,
        user: { id: user.id },
        assets: assetCreated,
        liabilities: liabilityCreated,
      });
      return await this.balanceRepository.save(balance);
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async createAssets(createAssetsDto: CreateAssetsDto) {
    try {
      const { currentAssets, fixedAssets, deferredAssets, ...assetsRest } =
        createAssetsDto;
      const { availableAssets, realizableAssets, demandableAssets, ...rest } =
        currentAssets;

      let totalAvailableAssets = 0;
      let totalRealizableAssets = 0;
      let totalDemandableAssets = 0;
      let totalFixedAssets = 0;
      let totalDeferredAssets = 0;

      // Crear activos disponibles
      const createdAvailableAssets = availableAssets.map((asset) => {
        totalAvailableAssets += asset.amount;
        return this.availableAssetsRepository.create(asset);
      });
      await this.availableAssetsRepository.save(createdAvailableAssets);

      // Crear activos realizables
      const createdRealizableAssets = realizableAssets.map((asset) => {
        totalRealizableAssets += asset.amount;
        return this.realizableAssetsRepository.create(asset);
      });
      await this.realizableAssetsRepository.save(createdRealizableAssets);

      // Crear activos exigibles
      const createdDemandableAssets = demandableAssets.map((asset) => {
        totalDemandableAssets += asset.amount;
        return this.demandableAssetsRepository.create(asset);
      });
      await this.demandableAssetsRepository.save(createdDemandableAssets);

      // Crear activos corrientes
      const createdCurrentAssets = this.currentAssetsRepository.create({
        ...rest,
        availableAssets: createdAvailableAssets,
        realizableAssets: createdRealizableAssets,
        demandableAssets: createdDemandableAssets,
        totalAvailableAssets,
        totalRealizableAssets,
        totalDemandableAssets,
        totalCurrentAssets:
          totalAvailableAssets + totalRealizableAssets + totalDemandableAssets,
      });
      await this.currentAssetsRepository.save(createdCurrentAssets);

      // Crear activos fijos
      const createdFixedAssets = fixedAssets.map((asset) => {
        totalFixedAssets += asset.amount;
        return this.fixedAssetsRepository.create(asset);
      });
      await this.fixedAssetsRepository.save(createdFixedAssets);

      // Crear activos diferidos
      const createdDeferredAssets = deferredAssets.map((asset) => {
        totalDeferredAssets += asset.amount;
        return this.deferredAssetsRepository.create(asset);
      });
      await this.deferredAssetsRepository.save(createdDeferredAssets);

      // Crear los activos principales
      const createdAssets = this.assetRepository.create({
        ...assetsRest,
        currentAssets: createdCurrentAssets,
        fixedAssets: createdFixedAssets,
        deferredAssets: createdDeferredAssets,
        totalCurrentAssets:
          totalAvailableAssets + totalRealizableAssets + totalDemandableAssets,
        totalFixedAssets,
        totalDeferredAssets,
        totalAssets:
          totalAvailableAssets +
          totalRealizableAssets +
          totalDemandableAssets +
          totalFixedAssets +
          totalDeferredAssets,
      });
      return await this.assetRepository.save(createdAssets);
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async createLiabilitiesEquity(
    createLiabilitiesEquityDto: CreateLiabilitiesEquityDto,
  ) {
    try {
      const {
        currentLiabilities,
        fixedLiabilities,
        equity,
        ...liabilitiesEquityRest
      } = createLiabilitiesEquityDto;

      let totalCurrentLiabilities = 0;
      let totalFixedLiabilities = 0;
      let totalEquity = 0;

      // Crear y guardar pasivos corrientes
      const newCurrentLiabilities = currentLiabilities.map((liability) => {
        totalCurrentLiabilities += liability.amount;
        return this.currentLiabilitiesRepository.create({ ...liability });
      });
      await this.currentLiabilitiesRepository.save(newCurrentLiabilities);

      // Crear y guardar pasivos fijos
      const newFixedLiabilities = fixedLiabilities.map((liability) => {
        totalFixedLiabilities += liability.amount;
        return this.fixedLiabilitiesRepository.create({ ...liability });
      });
      await this.fixedLiabilitiesRepository.save(newFixedLiabilities);

      // Crear y guardar patrimonio
      const newEquity = equity.map((equityItem) => {
        totalEquity += equityItem.amount;
        return this.equityRepository.create({ ...equityItem });
      });
      await this.equityRepository.save(newEquity);

      // Crear y guardar pasivos y patrimonio principal
      const newLiabilitiesEquity = this.liabilitiesEquityRepository.create({
        ...liabilitiesEquityRest,
        currentLiabilities: newCurrentLiabilities,
        fixedLiabilities: newFixedLiabilities,
        equity: newEquity,
        totalCurrentLiabilities,
        totalFixedLiabilities,
        totalEquity,
        totalLiabilitiesEquity:
          totalCurrentLiabilities + totalFixedLiabilities + totalEquity,
      });
      return await this.liabilitiesEquityRepository.save(newLiabilitiesEquity);
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async get(userId: string) {
    try {
      const user = await this.userService.findOne(userId);
      if (!user) throw new NotFoundException('Usuario no encontrado');

      const balance = await this.balanceRepository.find({
        where: { user: { id: user.id } },
        relations: [
          'assets',
          'liabilities',
          'assets',
          'assets.currentAssets',
          'assets.fixedAssets',
          'assets.deferredAssets',
          'assets.currentAssets.availableAssets',
          'assets.currentAssets.demandableAssets',
          'assets.currentAssets.realizableAssets',
          'liabilities',
          'liabilities.currentLiabilities',
          'liabilities.fixedLiabilities',
          'liabilities.equity',
        ],
      });

      return balance;
    } catch (error) {
      handlerError(error, this.logger);
    }
  }
  public async getOne(userId: string, year: number, month?: number) {
    try {
      console.log(year, month);
      const user = await this.userService.findOne(userId);
      if (!user) throw new NotFoundException('Usuario no encontrado');
      console.log(user);

      let balance;
      if (user.balance_type === BALANCE_TYPE.MONTHLY && month) {
        balance = await this.balanceRepository.findOne({
          where: { year, month },
          relations: [
            'assets',
            'liabilities',
            'assets',
            'assets.currentAssets',
            'assets.fixedAssets',
            'assets.deferredAssets',
            'assets.currentAssets.availableAssets',
            'assets.currentAssets.demandableAssets',
            'assets.currentAssets.realizableAssets',
            'liabilities',
            'liabilities.currentLiabilities',
            'liabilities.fixedLiabilities',
            'liabilities.equity',
          ],
        });
      } else {
        balance = await this.balanceRepository.findOne({
          where: { year },
          relations: [
            'assets',
            'liabilities',
            'assets',
            'assets.currentAssets',
            'assets.fixedAssets',
            'assets.deferredAssets',
            'assets.currentAssets.availableAssets',
            'assets.currentAssets.demandableAssets',
            'assets.currentAssets.realizableAssets',
            'liabilities',
            'liabilities.currentLiabilities',
            'liabilities.fixedLiabilities',
            'liabilities.equity',
          ],
        });
      }
      return balance;
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  // Other methods...
  public async staticPatrimonialAnalysis(
    userId: string,
    year: number,
    month?: number,
  ) {
    try {
      const user = await this.userService.findOne(userId);
      if (!user) throw new NotFoundException('Usuario no encontrado');

      const balance = await this.getOne(user.id, year, month);
      const { assets, liabilities } = balance;

      const assetAnalysis = await this.assestAnalysis(assets);
      const liabilityAnalysis = await this.liabilityAnalysis(liabilities);

      return { assetAnalysis, liabilityAnalysis };
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async dinamicPatrimonialAnalysis(userId: string) {
    try {
      const balances = await this.get(userId);
      const analysis = await Promise.all(
        balances.map(async (balance, index) => {
          const { assets, liabilities, year, month } = balance;
          const verticalAnalysis = await this.verticalAnalysis(
            assets,
            liabilities,
          );

          let horizontalAnalysis = null;
          if (index > 0) {
            const prevBalance = balances[index - 1];
            const prevAssets = prevBalance.assets;
            const prevLiabilities = prevBalance.liabilities;

            horizontalAnalysis = await this.horizontalAnalysis(
              assets,
              prevAssets,
              liabilities,
              prevLiabilities,
            );
          }

          return { year, month, verticalAnalysis, horizontalAnalysis };
        }),
      );

      return analysis;
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async horizontalAnalysis(
    currentAsset: AssetsEntity,
    previosAsset: AssetsEntity,
    currentLiabilities: LiabilitiesEquityEntity,
    previosLiabilities: LiabilitiesEquityEntity,
  ) {
    try {
      const assetGrowth =
        ((currentAsset.totalAssets - previosAsset.totalAssets) /
          previosAsset.totalAssets) *
        100;
      const liabilityGrowth =
        ((currentLiabilities.totalLiabilitiesEquity -
          previosLiabilities.totalLiabilitiesEquity) /
          previosLiabilities.totalLiabilitiesEquity) *
        100;

      return {
        assetGrowth,
        liabilityGrowth,
      };
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async verticalAnalysis(
    asset: AssetsEntity,
    liabilities: LiabilitiesEquityEntity,
  ) {
    try {
      const assetAnalysis = await this.assestAnalysis(asset);
      const liabilityAnalysis = await this.liabilityAnalysis(liabilities);
      return { assetAnalysis, liabilityAnalysis };
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async assestAnalysis(assets: AssetsEntity) {
    try {
      const {
        totalCurrentAssets,
        totalFixedAssets,
        totalDeferredAssets,
        totalAssets,
        currentAssets,
      } = assets;

      const {
        totalAvailableAssets,
        totalDemandableAssets,
        totalRealizableAssets,
      } = currentAssets;

      const availableAssetsPercentage =
        (totalAvailableAssets / totalCurrentAssets) * 100;
      const demandableAssetsPercentage =
        (totalDemandableAssets / totalCurrentAssets) * 100;
      const realizableAssetsPercentage =
        (totalRealizableAssets / totalCurrentAssets) * 100;

      const currentAssetsPercentage = (totalCurrentAssets / totalAssets) * 100;
      const fixedAssetsPercentage = (totalFixedAssets / totalAssets) * 100;
      const deferredAssetsPercentage =
        (totalDeferredAssets / totalAssets) * 100;

      return {
        availableAssetsPercentage,
        demandableAssetsPercentage,
        realizableAssetsPercentage,
        currentAssetsPercentage,
        fixedAssetsPercentage,
        deferredAssetsPercentage,
      };
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async liabilityAnalysis(liabilities: LiabilitiesEquityEntity) {
    try {
      const {
        totalCurrentLiabilities,
        totalFixedLiabilities,
        totalEquity,
        totalLiabilitiesEquity,
      } = liabilities;

      const currentLiabilitiesPercentage =
        (totalCurrentLiabilities / totalLiabilitiesEquity) * 100;
      const fixedLiabilitiesPercentage =
        (totalFixedLiabilities / totalLiabilitiesEquity) * 100;
      const equityPercentage = (totalEquity / totalLiabilitiesEquity) * 100;

      return {
        currentLiabilitiesPercentage,
        fixedLiabilitiesPercentage,
        equityPercentage,
      };
    } catch (error) {
      handlerError(error, this.logger);
    }
  }

  public async financialAnalysis(userId: string, year: number, month?: number) {
    const balance = await this.getOne(userId, year, month);

    // Extraemos los datos relevantes del balance
    const { assets, liabilities } = balance;

    // Liquidez
    const currentRatio =
      assets.totalCurrentAssets / liabilities.totalCurrentLiabilities;

    // Solvencia
    const debtRatio = liabilities.totalLiabilitiesEquity / assets.totalAssets;
    const equityRatio = liabilities.totalEquity / assets.totalAssets;

    // Razones adicionales
    const operatingRatio =
      (assets.totalCurrentAssets / liabilities.totalCurrentLiabilities) * 100; // Razón de funcionamiento (%)
    // const treasuryRatio =
    //   (assets.totalCurrentAssets -
    //     assets.currentAssets.realizableAssets /
    //       liabilities.totalLiabilitiesEquity) *
    //   100; // Razón de tesorería (%)
    // const availableRatio =
    //   (assets.currentAssets.availableAssets.total /
    //     liabilities.totalCurrentLiabilities) * 100; // Razón disponible (%)

    // Capital de Trabajo Neto
    const workingCapitalNet =
      assets.totalCurrentAssets - liabilities.totalCurrentLiabilities;

    // Razón Capital de Trabajo Neto / Activo Circulante
    const workingCapitalRatio = workingCapitalNet / assets.totalCurrentAssets;

    // Razón Capital de Trabajo Neto sobre Stock Debe estar mal
    // const workingCapitalStockRatio =
    //   workingCapitalNet / assets.currentAssets.stock.total;

    // Retornamos un objeto con los ratios financieros calculados
    return {
      currentRatio, // Ratio corriente: activos corrientes / pasivos corrientes
      debtRatio, // Ratio de endeudamiento: pasivos totales / activos totales
      equityRatio, // Ratio de capital: patrimonio neto / activos totales
      operatingRatio,
      // treasuryRatio,
      // availableRatio,
      workingCapitalNet,
      workingCapitalRatio,
      // workingCapitalStockRatio,
    };
  }
}
