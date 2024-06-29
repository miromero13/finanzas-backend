import { IsDecimal, IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  CURRENT_LIABILITIES_ACCOUNT,
  FIXED_LIABILITIES_ACCOUNT,
  EQUITY_ACCOUNT,
} from 'src/common/constants/account';

class CurrentLiabilityDto {
  @ApiProperty({
    example: CURRENT_LIABILITIES_ACCOUNT.ACCOUNTS_PAYABLE,
    description: 'Tipo de cuenta de pasivo corriente',
  })
  @IsEnum(CURRENT_LIABILITIES_ACCOUNT)
  account: CURRENT_LIABILITIES_ACCOUNT;

  @ApiProperty({ example: 5000.0, description: 'Monto del pasivo corriente' })
  @IsDecimal()
  amount: number;
}

class FixedLiabilityDto {
  @ApiProperty({
    example: FIXED_LIABILITIES_ACCOUNT.MORTGAGE,
    description: 'Tipo de cuenta de pasivo fijo',
  })
  @IsEnum(FIXED_LIABILITIES_ACCOUNT)
  account: FIXED_LIABILITIES_ACCOUNT;

  @ApiProperty({ example: 20000.0, description: 'Monto del pasivo fijo' })
  @IsDecimal()
  amount: number;
}

class EquityDto {
  @ApiProperty({
    example: EQUITY_ACCOUNT.CONTRIBUTED_CAPITAL,
    description: 'Tipo de cuenta de patrimonio',
  })
  @IsEnum(EQUITY_ACCOUNT)
  account: EQUITY_ACCOUNT;

  @ApiProperty({ example: 10000.0, description: 'Monto del patrimonio' })
  @IsDecimal()
  amount: number;
}

export class CreateLiabilitiesEquityDto {
  @ApiProperty({
    type: [CurrentLiabilityDto],
    description: 'Lista de pasivos corrientes',
  })
  @ValidateNested({ each: true })
  @Type(() => CurrentLiabilityDto)
  currentLiabilities: CurrentLiabilityDto[];

  @ApiProperty({
    type: [FixedLiabilityDto],
    description: 'Lista de pasivos fijos',
  })
  @ValidateNested({ each: true })
  @Type(() => FixedLiabilityDto)
  fixedLiabilities: FixedLiabilityDto[];

  @ApiProperty({ type: [EquityDto], description: 'Lista de patrimonios' })
  @ValidateNested({ each: true })
  @Type(() => EquityDto)
  equity: EquityDto[];
}
