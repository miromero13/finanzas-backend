import { Column, Entity, ManyToOne } from 'typeorm';
import { DEFERRED_ASSETS_ACCOUNT } from 'src/common/constants/account';
import { BaseEntity } from 'src/common/entities/base.entity';
import { IDeferredAssets } from '../interface/deferred-assets.interface';
import { AssetsEntity } from './assets.entity';

@Entity('deferred_assets')
export class DeferredAssetsEntity
  extends BaseEntity
  implements IDeferredAssets
{
  @Column({ type: 'enum', enum: DEFERRED_ASSETS_ACCOUNT, nullable: false })
  account: DEFERRED_ASSETS_ACCOUNT;

  @Column({ type: 'decimal', nullable: false })
  amount: number;

  @ManyToOne(() => AssetsEntity, (assets) => assets.deferredAssets)
  assets: AssetsEntity;
}
