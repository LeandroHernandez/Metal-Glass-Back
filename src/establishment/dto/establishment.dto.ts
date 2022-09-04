import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EstablishmentDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
