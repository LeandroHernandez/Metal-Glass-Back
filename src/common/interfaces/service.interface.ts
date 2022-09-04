/* eslint-disable prettier/prettier */
import { IPhoto } from './photo.interface';

export interface IService extends Document {
  id?: string;
  name: string;
  description?: string;
  // audio visual?: ???
  price: number;
  discount?: number;
  photos?: IPhoto[];
  // ILikeIt? boolean;
}
