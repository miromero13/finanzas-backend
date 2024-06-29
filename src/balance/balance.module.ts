import { Module } from '@nestjs/common';
import { BalanceService } from './services/balance.service';
import { BalanceController } from './controllers/balance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetsEntity } from './entities/assets.entity';
import { AvailableAssetsEntity } from './entities/available-assets.entity';
import { CurrentAssetsEntity } from './entities/current-assets.entity';
import { CurrentLiabilitiesEntity } from './entities/current-liabilities.entity';
import { DeferredAssetsEntity } from './entities/deferred-assets.entity';
import { DemandableAssetsEntity } from './entities/demandable-assets.entity';
import { EquityEntity } from './entities/equity.entity';
import { FixedAssetsEntity } from './entities/fixed-assets.entity';
import { FixedLiabilitiesEntity } from './entities/fixed-liabilities.entity';
import { LiabilitiesEquityEntity } from './entities/liabilities-equity.entity';
import { RealizableAssetsEntity } from './entities/realizable-assets.entity';
import { UsersModule } from 'src/users/users.module';
import { BalanceEntity } from './entities/balance.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BalanceEntity,
      AssetsEntity,
      AvailableAssetsEntity,
      CurrentAssetsEntity,
      CurrentLiabilitiesEntity,
      DeferredAssetsEntity,
      DemandableAssetsEntity,
      EquityEntity,
      FixedAssetsEntity,
      FixedLiabilitiesEntity,
      LiabilitiesEquityEntity,
      RealizableAssetsEntity,
    ]),
    UsersModule,
  ],
  providers: [BalanceService],
  controllers: [BalanceController],
  exports: [BalanceService],
})
export class BalanceModule {}
