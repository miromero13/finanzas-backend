import { AVAILABLE_ASSETS_ACCOUNT } from 'src/common/constants/account';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IAvailableAssets } from '../interface/available-assets.interface';
import { CurrentAssetsEntity } from './current-assets.entity';

@Entity('available_assets')
export class AvailableAssetsEntity
  extends BaseEntity
  implements IAvailableAssets
{
  @Column({ type: 'enum', enum: AVAILABLE_ASSETS_ACCOUNT, nullable: false })
  account: AVAILABLE_ASSETS_ACCOUNT;

  @Column({ type: 'decimal', nullable: false })
  amount: number;

  @ManyToOne(
    () => CurrentAssetsEntity,
    (currentAssets) => currentAssets.availableAssets,
  )
  currentAssets: CurrentAssetsEntity;
}
