// import { IEstablishment } from './establishment.interface';
import { IProduct } from './product.interface';
import { IUser } from './user.interface';
import { IEmployee } from './employee.interface';

export interface IPurchase extends Document {
  id?: string;
  // establishment?: IEstablishment[];
  user?: IUser[];
  userName: string;
  employee?: IEmployee[];
  employeeName: string;
  client?: IUser[];
  clientName: string;
  // state: string;
  subValue: number;
  discounts?: number;
  totalValue: number;
  // selectedProducts?: Array<IProduct[]>;
  selectedProducts?: Array<{
    // product: IProduct;
    product?: IProduct;
    productName: string;
    quantityOfThisProductInThePurchase: number;
  }>;
}
