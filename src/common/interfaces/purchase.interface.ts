import { IEstablishment } from './establishment.interface';
import { IProduct } from './product.interface';
import { IUser } from './user.interface';
import { ICede } from './cede.interface';

export interface IPurchase extends Document {
  id?: string;
  establishment?: IEstablishment[];
  cede?: ICede[];
  client?: IUser[];
  selectedProducts?: Array<IProduct[]>;
  date: Date;
  hora: Date;
  state: string;
  subValue: number;
  discounts?: number;
  totalValue: number;
}
