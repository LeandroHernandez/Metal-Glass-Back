import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { IClient } from 'src/common/interfaces/client.interface';
import { IEmployee } from 'src/common/interfaces/employee.interface';
import { IProduct } from 'src/common/interfaces/product.interface';
import { IUser } from 'src/common/interfaces/user.interface';

export class PurchaseDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  userId: IUser;
  @ApiProperty()
  @IsOptional()
  @IsString()
  userName: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  employeeId: IEmployee;
  @ApiProperty()
  @IsOptional()
  @IsString()
  employeeName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  clientId: IClient;
  @ApiProperty()
  @IsOptional()
  @IsString()
  clientName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  subValue: number;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  discounts?: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  totalValue: number;
  @ApiProperty()
  @IsNotEmpty()
  selectedProducts: Array<{
    // product: IProduct[];
    product?: IProduct;
    productName?: string;
    quantityOfThisProductInThePurchase: number;
  }>;
}
