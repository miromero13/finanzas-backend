import { IAvailableAssets } from './available-assets.interface';
import { IDemandableAssets } from './demandable-assets.interface';
import { IRealizableAssets } from './realizable-assets.interface';

export interface ICurrentAssets {
  availableAssets: IAvailableAssets[];
  demandableAssets: IDemandableAssets[];
  realizableAssets: IRealizableAssets[];
  totalAvailableAssets: number;
  totalDemandableAssets: number;
  totalRealizableAssets: number;
  totalCurrentAssets: number;
}
