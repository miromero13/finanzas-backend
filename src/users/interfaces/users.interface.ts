import { BALANCE_TYPE, COMPANY_TYPE } from 'src/common/constants/type';

export interface IUsers {
  name: string;
  email: string;
  password: string;
  phone?: string;
  ubication?: string;
  company_type: COMPANY_TYPE;
  balance_type: BALANCE_TYPE;
}
