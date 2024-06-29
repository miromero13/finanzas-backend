import { ICurrentAssets } from './current-assets.interface';
import { IDeferredAssets } from './deferred-assets.interface';
import { IFixedAssets } from './fixed-assets.interface';

export interface IAssets {
  currentAssets: ICurrentAssets;
  fixedAssets: IFixedAssets[];
  deferredAssets: IDeferredAssets[];
  totalCurrentAssets: number;
  totalFixedAssets: number;
  totalDeferredAssets: number;
  totalAssets: number;
}
