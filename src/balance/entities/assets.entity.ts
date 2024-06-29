import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { IAssets } from '../interface/assets-interface';
import { BaseEntity } from 'src/common/entities/base.entity';
import { CurrentAssetsEntity } from './current-assets.entity';
import { FixedAssetsEntity } from './fixed-assets.entity';
import { DeferredAssetsEntity } from './deferred-assets.entity';
import { BalanceEntity } from './balance.entity';

@Entity('assets')
export class AssetsEntity extends BaseEntity implements IAssets {
  @OneToOne(() => CurrentAssetsEntity, { cascade: true })
  @JoinColumn()
  currentAssets: CurrentAssetsEntity;

  @OneToMany(() => FixedAssetsEntity, (fixedAssets) => fixedAssets.assets, {
    cascade: true,
  })
  fixedAssets: FixedAssetsEntity[];

  @OneToMany(
    () => DeferredAssetsEntity,
    (deferredAssets) => deferredAssets.assets,
    {
      cascade: true,
    },
  )
  deferredAssets: DeferredAssetsEntity[];

  @Column({ type: 'decimal', nullable: false })
  totalCurrentAssets: number;

  @Column({ type: 'decimal', nullable: false })
  totalFixedAssets: number;

  @Column({ type: 'decimal', nullable: false })
  totalDeferredAssets: number;

  @Column({ type: 'decimal', nullable: false })
  totalAssets: number;

  @OneToOne(() => BalanceEntity, (balance) => balance.assets)
  balance: BalanceEntity;
}
