/* eslint-disable prettier/prettier */
import { ICategory } from './category.interface';
import { ICede } from './cede.interface';
import { IEmployee } from './employee.interface';
import { IPhoto } from './photo.interface';
import { IProduct } from './product.interface';
import { IService } from './service.interface';
import { IUser } from './user.interface';

export interface IEstablishment extends Document {
  id?: string;
  owner?: IUser[];
  name: string;
  categorys?: ICategory[];
  cedes: ICede[];
  employees?: IEmployee[];
  serviceCatalog?: IService[];
  productCatalog?: IProduct[];
  ILikeIt?: boolean;
  photos?: IPhoto[];
}
