import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TypeDocumentDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  type: string;
  @ApiProperty()
  @IsOptional()
  description: string;
}
