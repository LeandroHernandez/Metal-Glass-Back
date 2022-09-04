import { IAppointment } from './appointment.interface';
import { IEstablishment } from './establishment.interface';
import { IPhoto } from './photo.interface';
import { IPurchase } from './purchase.interface';
import { ISubscription } from './subscription.interface';

export interface IUser extends Document {
  id?: string;
  documentType: string;
  documentNumber: string;
  username: string;
  names: string;
  surnames: string;
  email: string;
  password: string;
  establishments?: IEstablishment[];
  subscription?: ISubscription[];
  // subscription?: ISubscription;
  requestedAppointments?: IAppointment[];
  requestedPurchases?: IPurchase[];
  active: boolean;
  photos?: IPhoto[];
}
