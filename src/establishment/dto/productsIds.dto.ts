import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import { IProduct } from 'src/common/interfaces/product.interface';

export class ProductsIdsDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  productsIds: IProduct[];
}
