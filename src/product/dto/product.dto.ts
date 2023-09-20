import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  // name: string;
  productName: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;
  @ApiProperty()
  @IsNotEmpty()
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
  @IsOptional()
  photos: Array<string>;
}
