import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { ILiabilitiesEquity } from '../interface/liabilities-Equity.interface';
import { CurrentLiabilitiesEntity } from './current-liabilities.entity';
import { FixedLiabilitiesEntity } from './fixed-liabilities.entity';
import { EquityEntity } from './equity.entity';
import { BalanceEntity } from './balance.entity';

@Entity('liabilities_equity')
export class LiabilitiesEquityEntity
  extends BaseEntity
  implements ILiabilitiesEquity
{
  @OneToMany(
    () => CurrentLiabilitiesEntity,
    (currentLiabilities) => currentLiabilities.liabilitiesEquity,
    { cascade: true },
  )
  currentLiabilities: CurrentLiabilitiesEntity[];

  @OneToMany(
    () => FixedLiabilitiesEntity,
    (fixedLiabilities) => fixedLiabilities.liabilitiesEquity,
    { cascade: true },
  )
  fixedLiabilities: FixedLiabilitiesEntity[];

  @OneToMany(() => EquityEntity, (equity) => equity.liabilitiesEquity, {
    cascade: true,
  })
  equity: EquityEntity[];

  @Column({ type: 'decimal', nullable: false })
  totalCurrentLiabilities: number;

  @Column({ type: 'decimal', nullable: false })
  totalFixedLiabilities: number;

  @Column({ type: 'decimal', nullable: false })
  totalEquity: number;

  @Column({ type: 'decimal', nullable: false })
  totalLiabilitiesEquity: number;

  @OneToOne(() => BalanceEntity, (balance) => balance.liabilities)
  balance: BalanceEntity;
}
