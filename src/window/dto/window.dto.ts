import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IAccessory } from 'src/common/interfaces/accessory.interfaces';
import { IAcrylic } from 'src/common/interfaces/acrylic.interface';
import { IGlass } from 'src/common/interfaces/glass.interface';
import { IProfile } from 'src/common/interfaces/profile.interface';

export class WindowDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsArray()
  // accessories: Array<IAccessory>;
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsArray()
  // profiles: Array<IProfile>;
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsArray()
  // glasses: Array<IGlass>;
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsArray()
  // acrylics: Array<IAcrylic>;
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  accessories: Array<{ accessory: IAccessory; amountOfAccessories: number }>;
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  profiles: Array<{ profile: IProfile; numberOfMeters: number }>;
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  glasses: Array<{ glass: IGlass; numberOfSquareMeters: number }>;
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  acrylics: Array<{ acrylic: IAcrylic; numberOfSquareMeters: number }>;
}
