import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
// import { IAppointment } from 'src/common/interfaces/appointment.interface';
// import { IPurchase } from 'src/common/interfaces/purchase.interface';
import { ITypeDocument } from 'src/common/interfaces/type-document.interface';

export class ClientDTO {
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  // name: string;
  @ApiProperty()
  @IsNotEmpty()
  // @IsString()
  // documentTypeId: ITypeDocument;
  documentTypeId: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  documentNumber: string;
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
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  // shoppingHistory: IPurchase[];
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  // datingHistory: IAppointment[];
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  customerGrade?: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  Nit?: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  Contact?: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  Address?: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  City?: string;
}
