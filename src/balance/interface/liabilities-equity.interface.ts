import { ICurrentLiabilities } from './current-liabilities.interface';
import { IFixedLiabilities } from './fixed-liabilities.interface';
import { IEquity } from './equity-interface';

export interface ILiabilitiesEquity {
  currentLiabilities: ICurrentLiabilities[];
  fixedLiabilities: IFixedLiabilities[];
  equity: IEquity[];
  totalCurrentLiabilities: number;
  totalFixedLiabilities: number;
  totalEquity: number;
  totalLiabilitiesEquity: number;
}
