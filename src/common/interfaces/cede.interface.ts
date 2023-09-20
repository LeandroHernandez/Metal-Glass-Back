/* eslint-disable prettier/prettier */
import { IEstablishment } from './establishment.interface';
import { IAppointment } from './appointment.interface';
import { IPurchase } from './purchase.interface';
import { IUbication } from './ubication.interface';
import { IService } from './service.interface';
import { IEmployee } from './employee.interface';
import { IProduct } from './product.interface';
import { IPhoto } from './photo.interface';

export interface ICede extends Document {
  id?: string;
  establishment?: IEstablishment[];
  cedeName: string;
  ubication: IUbication;
  assignedEmployees?: IEmployee[];
  servicesCatalog?: IService[] | Array<IService[]>;
  productsCatalog?: IProduct[] | Array<IProduct[]>;
  datingHistory?: IAppointment[];
  shoppingHistory?: IPurchase[];
  // photos?: any[];
  // photos?: Express.Multer.File[];
  photos?: IPhoto[];
  // photos?: string[];
}
