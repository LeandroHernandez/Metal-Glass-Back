import { IAppointment } from './appointment.interface';
import { IPurchase } from './purchase.interface';
import { ITypeDocument } from './type-document.interface';

export interface IClient extends Document {
  id?: string;
  //   documentType: string;
  documentType?: ITypeDocument[];
  documentNumber: string;
  names: string;
  surnames: string;
  phoneNumber?: string;
  email?: string;
  shoppingHistory?: IPurchase[];
  datingHistory?: IAppointment[];
  // customerGrade?: any;
  customerGrade?: number;
  Nit?: string;
  Contact?: string;
  Address?: string;
  City?: string;
}
