import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class RegisterAssignmentAndaddEmployeesDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  administratorWhoAssignsName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  employeeWhoAssignsName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  administratorsResponsibleForTheAssignedNames: Array<string>;
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  employeesResponsibleForTheAssignedNames: Array<string>;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  theAssigned: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  employeesIds: string[];
}
