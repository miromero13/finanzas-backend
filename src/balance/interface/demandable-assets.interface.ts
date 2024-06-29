import { DEMANDABLE_ASSETS_ACCOUNT } from 'src/common/constants/account';

export interface IDemandableAssets {
  account: DEMANDABLE_ASSETS_ACCOUNT;
  amount: number;
}
