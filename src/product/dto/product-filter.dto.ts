import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductFilterDTO {
  @ApiProperty()
  @IsOptional()
  @IsArray()
  productName: Array<string>;
  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  price: number;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  discount: number;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  amount: number;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  numberOfRequests: number;
}
