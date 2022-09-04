import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PurchaseStatusDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  status: string;
  @ApiProperty()
  @IsOptional()
  description: string;
}
