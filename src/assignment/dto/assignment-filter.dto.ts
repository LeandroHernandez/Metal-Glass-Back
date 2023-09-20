import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class AssignmentFilterDTO {
  @ApiProperty()
  @IsOptional()
  @IsArray()
  whoAssigns: Array<string>;
  @ApiProperty()
  @IsOptional()
  @IsArray()
  responsibleForTheAssignment: Array<string>;
  @ApiProperty()
  @IsOptional()
  @IsString()
  theAssigned: string;
}
