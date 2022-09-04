import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ICede } from 'src/common/interfaces/cede.interface';

export class EmployeeDTO {
  @ApiProperty()
  @IsOptional()
  assignedCedes?: ICede[];
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  documentType: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  documentNumber: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  names: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  surnames: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
  // permissions?: Ipermission;
  // chores: IChore;
}
