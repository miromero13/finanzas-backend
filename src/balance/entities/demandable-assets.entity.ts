import { DEMANDABLE_ASSETS_ACCOUNT } from 'src/common/constants/account';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IDemandableAssets } from '../interface/demandable-assets.interface';
import { CurrentAssetsEntity } from './current-assets.entity';

@Entity('demandable_assets')
export class DemandableAssetsEntity
  extends BaseEntity
  implements IDemandableAssets
{
  @Column({ type: 'enum', enum: DEMANDABLE_ASSETS_ACCOUNT, nullable: false })
  account: DEMANDABLE_ASSETS_ACCOUNT;

  @Column({ type: 'decimal', nullable: false })
  amount: number;

  @ManyToOne(
    () => CurrentAssetsEntity,
    (currentAssets) => currentAssets.demandableAssets,
  )
  currentAssets: CurrentAssetsEntity;
}
