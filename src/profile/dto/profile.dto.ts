import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ProfileDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  pricePerMeter: number;
}
