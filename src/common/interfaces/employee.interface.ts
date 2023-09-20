import { IAppointment } from './appointment.interface';
import { IAssignment } from './assignment.interface';
import { IPhoto } from './photo.interface';
import { IPurchase } from './purchase.interface';
import { ITypeDocument } from './type-document.interface';

export interface IEmployee extends Document {
  // id?: string;
  _id?: string;
  documentType?: ITypeDocument[];
  documentNumber: string;
  names: string;
  surnames: string;
  phoneNumber?: string;
  email?: string;
  username: string;
  password: string;
  historyOfAdvisedPurchases?: IPurchase[];
  historyOfCounselingAppointments?: IAppointment[];
  photos?: IPhoto[];
  whatIHaveAssignedToOthers?: IAssignment[];
  whatOthersHaveAssignedToMe?: IAssignment[];
}
