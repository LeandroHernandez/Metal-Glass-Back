export interface IGlass extends Document {
  id?: string;
  name: string;
  description?: string;
  // discount?: string;
  pricePerSquareMeter: number;
}
