import { FIXED_ASSETS_ACCOUNT } from 'src/common/constants/account';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IFixedAssets } from '../interface/fixed-assets.interface';
import { AssetsEntity } from './assets.entity';

@Entity('fixed_assets')
export class FixedAssetsEntity extends BaseEntity implements IFixedAssets {
  @Column({ type: 'enum', enum: FIXED_ASSETS_ACCOUNT, nullable: false })
  account: FIXED_ASSETS_ACCOUNT;

  @Column({ type: 'decimal', nullable: false })
  amount: number;

  @ManyToOne(() => AssetsEntity, (assets) => assets.fixedAssets)
  assets: AssetsEntity;
}
