import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  documentType: string;
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
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsBoolean()
  // active: boolean;
}
