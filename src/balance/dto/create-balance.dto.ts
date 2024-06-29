import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { CreateAssetsDto } from './create-assets.dto';
import { CreateLiabilitiesEquityDto } from './create-liabilities.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBalanceDto {
  @ApiProperty({ example: 2024, description: 'Año del balance' })
  @IsNumber()
  @Min(2020)
  @Max(new Date().getFullYear())
  year: number;

  @ApiProperty({ example: 12, description: 'Mes del balance' })
  @IsNumber()
  @Min(1)
  @Max(12)
  @IsOptional()
  month?: number;

  @ApiProperty({
    type: CreateAssetsDto,
    description: 'Detalles de los activos',
  })
  @Type(() => CreateAssetsDto)
  assets: CreateAssetsDto;

  @ApiProperty({
    type: CreateLiabilitiesEquityDto,
    description: 'Detalles de los pasivos y patrimonio',
  })
  @Type(() => CreateLiabilitiesEquityDto)
  liabilitiesEquity: CreateLiabilitiesEquityDto;
}
