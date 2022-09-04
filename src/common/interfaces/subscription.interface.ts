export interface ISubscription extends Document {
  id?: string;
  name?: string;
  numberOfServicesAllowed?: number;
  numberOfProductsAllowed?: number;
  appointmentAssignment?: boolean;
  numberOfEmployeesAllowed?: number;
  //allowedPhotoQuality?: number;
  //allowedVideoQuality?: number;
  virtualEstablishmen?: boolean;
  value: number;
}
