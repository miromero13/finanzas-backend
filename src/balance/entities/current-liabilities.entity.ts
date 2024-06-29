import { Column, Entity, ManyToOne } from 'typeorm';
Entity;
import { BaseEntity } from 'src/common/entities/base.entity';
import { ICurrentLiabilities } from '../interface/current-liabilities.interface';
import { CURRENT_LIABILITIES_ACCOUNT } from 'src/common/constants/account';
import { LiabilitiesEquityEntity } from './liabilities-equity.entity';

@Entity('current_liabilities')
export class CurrentLiabilitiesEntity
  extends BaseEntity
  implements ICurrentLiabilities
{
  @Column({ type: 'enum', enum: CURRENT_LIABILITIES_ACCOUNT, nullable: false })
  account: CURRENT_LIABILITIES_ACCOUNT;

  @Column({ type: 'decimal', nullable: false })
  amount: number;

  @ManyToOne(
    () => LiabilitiesEquityEntity,
    (liabilitiesEquity) => liabilitiesEquity.currentLiabilities,
  )
  liabilitiesEquity: LiabilitiesEquityEntity;
}
