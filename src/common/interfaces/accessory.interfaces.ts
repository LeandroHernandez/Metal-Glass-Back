export interface IAccessory extends Document {
  id?: string;
  name: string;
  description?: string;
  // discount?: string;
  price: number;
}
