import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class PurchaseFilterDTO {
  @ApiProperty()
  @IsOptional()
  // @IsString()
  // userName: string;
  @IsArray()
  userName: Array<string>;
  @ApiProperty()
  @IsOptional()
  @IsArray()
  employeeName: Array<string>;
  @ApiProperty()
  @IsOptional()
  @IsArray()
  clientName: Array<string>;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  subValue: number;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  discount: number;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  total: number;
}
