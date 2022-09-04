import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ICede } from 'src/common/interfaces/cede.interface';
import { IEstablishment } from 'src/common/interfaces/establishment.interface';
import { IProduct } from 'src/common/interfaces/product.interface';
import { IUser } from 'src/common/interfaces/user.interface';

export class PurchaseDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  establishmentId: IEstablishment;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cedeId: ICede;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  clientId: IUser;
  //   date: Date;
  //   hora: Date;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  state: string;
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
  selectedProducts?: IProduct[];
}
