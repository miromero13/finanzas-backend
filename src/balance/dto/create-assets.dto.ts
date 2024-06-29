import { IsDecimal, IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  AVAILABLE_ASSETS_ACCOUNT,
  DEMANDABLE_ASSETS_ACCOUNT,
  REALIZABLE_ASSETS_ACCOUNT,
  FIXED_ASSETS_ACCOUNT,
  DEFERRED_ASSETS_ACCOUNT,
} from 'src/common/constants/account';

class AvailableAssetDto {
  @ApiProperty({
    example: AVAILABLE_ASSETS_ACCOUNT.CASH,
    description: 'Tipo de cuenta de activo disponible',
  })
  @IsEnum(AVAILABLE_ASSETS_ACCOUNT)
  account: AVAILABLE_ASSETS_ACCOUNT;

  @ApiProperty({ example: 1000.0, description: 'Monto del activo disponible' })
  @IsDecimal()
  amount: number;
}

class DemandableAssetDto {
  @ApiProperty({
    example: DEMANDABLE_ASSETS_ACCOUNT.ACCOUNTS_RECEIVABLE,
    description: 'Tipo de cuenta de activo exigible',
  })
  @IsEnum(DEMANDABLE_ASSETS_ACCOUNT)
  account: DEMANDABLE_ASSETS_ACCOUNT;

  @ApiProperty({ example: 5000.0, description: 'Monto del activo exigible' })
  @IsDecimal()
  amount: number;
}

class RealizableAssetDto {
  @ApiProperty({
    example: REALIZABLE_ASSETS_ACCOUNT.STOCK,
    description: 'Tipo de cuenta de activo realizable',
  })
  @IsEnum(REALIZABLE_ASSETS_ACCOUNT)
  account: REALIZABLE_ASSETS_ACCOUNT;

  @ApiProperty({ example: 3000.0, description: 'Monto del activo realizable' })
  @IsDecimal()
  amount: number;
}

class CurrentAssetsDto {
  @ApiProperty({
    type: [AvailableAssetDto],
    description: 'Lista de activos disponibles',
  })
  @ValidateNested({ each: true })
  @Type(() => AvailableAssetDto)
  availableAssets: AvailableAssetDto[];

  @ApiProperty({
    type: [DemandableAssetDto],
    description: 'Lista de activos exigibles',
  })
  @ValidateNested({ each: true })
  @Type(() => DemandableAssetDto)
  demandableAssets: DemandableAssetDto[];

  @ApiProperty({
    type: [RealizableAssetDto],
    description: 'Lista de activos realizables',
  })
  @ValidateNested({ each: true })
  @Type(() => RealizableAssetDto)
  realizableAssets: RealizableAssetDto[];
}

class FixedAssetDto {
  @ApiProperty({
    example: FIXED_ASSETS_ACCOUNT.LANDS,
    description: 'Tipo de cuenta de activo fijo',
  })
  @IsEnum(FIXED_ASSETS_ACCOUNT)
  account: FIXED_ASSETS_ACCOUNT;

  @ApiProperty({ example: 20000.0, description: 'Monto del activo fijo' })
  @IsDecimal()
  amount: number;
}

class DeferredAssetDto {
  @ApiProperty({
    example: DEFERRED_ASSETS_ACCOUNT.INSURANCE,
    description: 'Tipo de cuenta de activo diferido',
  })
  @IsEnum(DEFERRED_ASSETS_ACCOUNT)
  account: DEFERRED_ASSETS_ACCOUNT;

  @ApiProperty({ example: 1000.0, description: 'Monto del activo diferido' })
  @IsDecimal()
  amount: number;
}

export class CreateAssetsDto {
  @ApiProperty({ type: CurrentAssetsDto, description: 'Activos corrientes' })
  @ValidateNested()
  @Type(() => CurrentAssetsDto)
  currentAssets: CurrentAssetsDto;

  @ApiProperty({ type: [FixedAssetDto], description: 'Lista de activos fijos' })
  @ValidateNested({ each: true })
  @Type(() => FixedAssetDto)
  fixedAssets: FixedAssetDto[];

  @ApiProperty({
    type: [DeferredAssetDto],
    description: 'Lista de activos diferidos',
  })
  @ValidateNested({ each: true })
  @Type(() => DeferredAssetDto)
  deferredAssets: DeferredAssetDto[];
}
