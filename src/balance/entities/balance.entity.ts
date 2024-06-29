import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { AssetsEntity } from './assets.entity';
import { LiabilitiesEquityEntity } from './liabilities-equity.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity({ name: 'balance' })
export class BalanceEntity extends BaseEntity {
  @Column({ type: 'int', nullable: false })
  year: number;

  @Column({ type: 'int', nullable: true })
  month?: number;

  @ManyToOne(() => UserEntity, (user) => user.balances, { nullable: false })
  user: UserEntity;

  @OneToOne(() => AssetsEntity, (asset) => asset.balance)
  @JoinColumn()
  assets: AssetsEntity;

  @OneToOne(() => LiabilitiesEquityEntity, (liabilitys) => liabilitys.balance)
  @JoinColumn()
  liabilities: LiabilitiesEquityEntity;
}
