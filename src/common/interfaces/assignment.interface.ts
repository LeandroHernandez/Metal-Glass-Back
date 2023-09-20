// import { IEmployee } from './employee.interface';
// import { IUser } from './user.interface';

export interface IAssignment extends Document {
  id?: string;
  whoAssigns: Array<string>;
  responsibleForTheAssignment: Array<string>;
  theAssigned: string;
}
