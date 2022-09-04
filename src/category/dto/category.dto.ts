import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ICategory } from 'src/common/interfaces/category.interface';

export class CategoryDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  description?: string;
  @ApiProperty()
  fatherCategory?: ICategory;
  @ApiProperty()
  subCategorys?: ICategory[];
}
