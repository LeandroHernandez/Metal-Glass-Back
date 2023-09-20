import { IAccessory } from './accessory.interfaces';
import { IAcrylic } from './acrylic.interface';
import { IGlass } from './glass.interface';
import { IProfile } from './profile.interface';

export interface IWindow extends Document {
  id?: string;
  name: string;
  price: number;
  // accessories: Array<IAccessory>;
  // profiles: Array<IProfile>;
  // glasses: Array<IGlass>;
  // acrylics: Array<IAcrylic>;
  accessories: Array<{ accessory: IAccessory; amountOfAccessories: number }>;
  profiles: Array<{ profile: IProfile; numberOfMeters: number }>;
  glasses: Array<{ glass: IGlass; numberOfSquareMeters: number }>;
  acrylics: Array<{ acrylic: IAcrylic; numberOfSquareMeters: number }>;
}
