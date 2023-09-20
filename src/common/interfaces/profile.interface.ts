export interface IProfile extends Document {
  id?: string;
  name: string;
  description?: string;
  // discount?: string;
  pricePerMeter: number;
}
