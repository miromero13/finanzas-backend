import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IEquity } from '../interface/equity-interface';
import { EQUITY_ACCOUNT } from 'src/common/constants/account';
import { LiabilitiesEquityEntity } from './liabilities-equity.entity';

@Entity('equity')
export class EquityEntity extends BaseEntity implements IEquity {
  @Column({ type: 'enum', enum: EQUITY_ACCOUNT, nullable: false })
  account: EQUITY_ACCOUNT;

  @Column({ type: 'decimal', nullable: false })
  amount: number;

  @ManyToOne(
    () => LiabilitiesEquityEntity,
    (liabilitiesEquity) => liabilitiesEquity.equity,
  )
  liabilitiesEquity: LiabilitiesEquityEntity;
}
