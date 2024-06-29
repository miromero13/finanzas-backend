import { Column, Entity, ManyToOne } from 'typeorm';
import { REALIZABLE_ASSETS_ACCOUNT } from 'src/common/constants/account';
import { IRealizableAssets } from '../interface/realizable-assets.interface';
import { BaseEntity } from 'src/common/entities/base.entity';
import { CurrentAssetsEntity } from './current-assets.entity';

@Entity('realizable_assets')
export class RealizableAssetsEntity
  extends BaseEntity
  implements IRealizableAssets
{
  @Column({ type: 'enum', enum: REALIZABLE_ASSETS_ACCOUNT, nullable: false })
  account: REALIZABLE_ASSETS_ACCOUNT;

  @Column({ type: 'decimal', nullable: false })
  amount: number;

  @ManyToOne(
    () => CurrentAssetsEntity,
    (currentAssets) => currentAssets.realizableAssets,
  )
  currentAssets: CurrentAssetsEntity;
}
