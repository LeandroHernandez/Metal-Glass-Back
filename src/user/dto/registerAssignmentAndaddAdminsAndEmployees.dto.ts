import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class RegisterAssignmentAndaddAdminsAndEmployeesDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  theAssigned: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  adminsIds: string[];
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  employeesIds: string[];
}
