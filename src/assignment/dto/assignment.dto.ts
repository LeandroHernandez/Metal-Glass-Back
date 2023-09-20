import { ApiProperty } from '@nestjs/swagger';
// import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class AssignmentDTO {
  // @ApiProperty()
  // @IsOptional()
  // @IsString()
  // administratorWhoAssignsId: string;
  // @ApiProperty()
  // @IsOptional()
  // @IsString()
  // employeeWhoAssignsId: string;
  // @ApiProperty()
  // @IsOptional()
  // @IsArray()
  // administratorsResponsibleForTheAssignedIds: string[];
  // @ApiProperty()
  // @IsOptional()
  // @IsArray()
  // employeesResponsibleForTheAssignedIds: string[];

  // @ApiProperty()
  // @IsString()
  // administratorWhoAssignsName: string;
  // @ApiProperty()
  // @IsString()
  // employeeWhoAssignsName: string;
  // @ApiProperty()
  // @IsArray()
  // administratorsResponsibleForTheAssignedNames: Array<string>;
  // @ApiProperty()
  // @IsArray()
  // employeesResponsibleForTheAssignedNames: Array<string>;
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  whoAssigns: Array<string>;
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  responsibleForTheAssignment: Array<string>;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  theAssigned: string;
}
