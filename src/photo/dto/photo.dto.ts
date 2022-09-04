import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PhotoDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsOptional()
  description: string;
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  // name_belongingTo: string;
  // @ApiProperty()
  // @IsNotEmpty()
  // heOrIt_belongingTo:
  //   | IUser
  //   | IEstablishment
  //   | IEmployee
  //   | ICede
  //   | IService
  //   | IProduct;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  photoPath: string;
}
