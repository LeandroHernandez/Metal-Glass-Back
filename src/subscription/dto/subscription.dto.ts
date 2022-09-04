import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class SubscriptionDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  numberOfServicesAllowed?: number;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  numberOfProductsAllowed?: number;
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  appointmentAssignment?: boolean;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  numberOfEmployeesAllowed?: number;
  //allowedPhotoQuality?: number;
  //allowedVideoQuality?: number;
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  virtualEstablishmen?: boolean;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  value?: number;
}
