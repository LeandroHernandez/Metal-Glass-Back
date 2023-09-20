import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  documentTypeId: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  documentNumber: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  names: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  surnames: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
