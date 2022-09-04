import { ICede } from './cede.interface';
import { IEstablishment } from './establishment.interface';
import { IPhoto } from './photo.interface';

export interface IEmployee extends Document {
  id?: string;
  establishment?: IEstablishment[];
  assignedCedes?: ICede[];
  documentType: string;
  documentNumber: string;
  names: string;
  surnames: string;
  password: string;
  photos?: IPhoto[];
  // permissions?: Ipermission[];
  // chores: IChore[];
}
