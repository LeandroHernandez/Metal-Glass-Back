import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IUbication } from 'src/common/interfaces/ubication.interface';

export class CedeDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  ubication: IUbication;
  // @ApiProperty()
  // @IsOptional()
  // photos?: string[];
}
