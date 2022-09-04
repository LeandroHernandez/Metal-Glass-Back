import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ICede } from 'src/common/interfaces/cede.interface';
import { IEstablishment } from 'src/common/interfaces/establishment.interface';
import { IService } from 'src/common/interfaces/service.interface';
import { IUser } from 'src/common/interfaces/user.interface';

export class AppointmentDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  establishmentId: IEstablishment;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cedeId: ICede;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  clientId: IUser;
  // selectedService: IService[];
  //   date: Date;
  //   hour: Date;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  state: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  subValue: number;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  discounts?: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  totalValue: number;
  @ApiProperty()
  @IsNotEmpty()
  selectedServices: IService[];
}
