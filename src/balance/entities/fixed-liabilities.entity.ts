import { FIXED_LIABILITIES_ACCOUNT } from 'src/common/constants/account';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { IFixedLiabilities } from '../interface/fixed-liabilities.interface';
import { LiabilitiesEquityEntity } from './liabilities-equity.entity';

@Entity('fixed_liabilities')
export class FixedLiabilitiesEntity
  extends BaseEntity
  implements IFixedLiabilities
{
  @Column({ type: 'enum', enum: FIXED_LIABILITIES_ACCOUNT, nullable: false })
  account: FIXED_LIABILITIES_ACCOUNT;

  @Column({ type: 'decimal', nullable: false })
  amount: number;

  @ManyToOne(
    () => LiabilitiesEquityEntity,
    (liabilitiesEquity) => liabilitiesEquity.fixedLiabilities,
  )
  liabilitiesEquity: LiabilitiesEquityEntity;
}
