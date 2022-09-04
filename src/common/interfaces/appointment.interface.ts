import { ICede } from './cede.interface';
import { IEstablishment } from './establishment.interface';
import { IService } from './service.interface';
import { IUser } from './user.interface';

export interface IAppointment extends Document {
  id?: string;
  establishment?: IEstablishment[];
  cede?: ICede[];
  client?: IUser[];
  state: string;
  subValue: number;
  discounts?: number;
  totalValue: number;
  selectedServices?: Array<IService[]>;
  //   date: Date;
  //   hour: Date;
}
