import { IAppointment } from './appointment.interface';
import { IAssignment } from './assignment.interface';
import { IPhoto } from './photo.interface';
import { IPurchase } from './purchase.interface';
import { ITypeDocument } from './type-document.interface';

export interface IUser extends Document {
  _id?: string;
  // documentType: string;
  documentType: ITypeDocument[];
  documentNumber: string;
  username: string;
  names: string;
  surnames: string;
  email: string;
  password: string;
  photos?: IPhoto[];
  historyOfAdvisedPurchases?: IPurchase[];
  historyOfCounselingAppointments?: IAppointment[];
  whatIHaveAssignedToOthers?: IAssignment[];
  whatOthersHaveAssignedToMe?: IAssignment[];
}
