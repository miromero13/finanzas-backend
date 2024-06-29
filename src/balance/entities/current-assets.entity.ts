import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { ICurrentAssets } from '../interface/current-assets.interface';
import { BaseEntity } from 'src/common/entities/base.entity';
import { AvailableAssetsEntity } from './available-assets.entity';
import { DemandableAssetsEntity } from './demandable-assets.entity';
import { RealizableAssetsEntity } from './realizable-assets.entity';
import { AssetsEntity } from './assets.entity';

@Entity('current_assets')
export class CurrentAssetsEntity extends BaseEntity implements ICurrentAssets {
  @OneToMany(
    () => AvailableAssetsEntity,
    (availableAssets) => availableAssets.currentAssets,
    { cascade: true },
  )
  availableAssets: AvailableAssetsEntity[];

  @OneToMany(
    () => DemandableAssetsEntity,
    (demandableAssets) => demandableAssets.currentAssets,
    { cascade: true },
  )
  demandableAssets: DemandableAssetsEntity[];

  @OneToMany(
    () => RealizableAssetsEntity,
    (realizableAssets) => realizableAssets.currentAssets,
    { cascade: true },
  )
  realizableAssets: RealizableAssetsEntity[];

  @Column({ type: 'decimal', nullable: false })
  totalAvailableAssets: number;

  @Column({ type: 'decimal', nullable: false })
  totalDemandableAssets: number;

  @Column({ type: 'decimal', nullable: false })
  totalRealizableAssets: number;

  @Column({ type: 'decimal', nullable: false })
  totalCurrentAssets: number;

  @OneToOne(() => AssetsEntity, (asset) => asset.currentAssets)
  asset: AssetsEntity;
}
