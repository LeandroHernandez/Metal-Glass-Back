import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AditionalReferenceDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  reference: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;
}
