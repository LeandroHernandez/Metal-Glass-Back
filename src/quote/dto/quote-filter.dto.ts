import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class QuoteFilterDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  clientName: string;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  others: number;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  extraPercentage: number;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  generalValue: number;
}
