/* eslint-disable prettier/prettier */
import { IPhoto } from './photo.interface';

export interface IProduct extends Document {
  id?: string;
  name: string;
  description?: string;
  price: number;
  discount?: number;
  photos?: IPhoto[];
  // ILikeIt?: boolean;
  // Audiovisual? ???
}
