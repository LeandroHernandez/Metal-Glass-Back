/* eslint-disable prettier/prettier */
import { IPhoto } from './photo.interface';

export interface IProduct extends Document {
  id?: string;
  // name: string;
  productName: string;
  description?: string;
  price: number;
  discount?: number;
  amount?: number;
  numberOfRequests?: number;
  photos?: IPhoto[];
}
