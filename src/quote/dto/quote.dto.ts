import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
// import { IClient } from 'src/common/interfaces/client.interface';
import {
  IFormQuoteGeneralArrayItem,
  IProductPerQuote,
  ITypeOfProductToQuote,
} from 'src/common/interfaces/quote.interface';

export class QuoteDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  // clients: Array<IClient>;
  client: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  clientName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  extraPercentage: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  formQuoteGeneralArray: Array<IFormQuoteGeneralArrayItem>;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  others: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  generalValue: number;
  @ApiProperty()
  @IsOptional()
  quoteNumber: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  productsPerQuote: Array<IProductPerQuote>;
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  typesOfProductsToQuote: Array<ITypeOfProductToQuote>;
  @ApiProperty()
  @IsOptional()
  @IsString()
  observations: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  metalGlassNit?: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  metalGlassCellPhoneNumber?: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  headerTitle?: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  clientNit?: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  clientContact?: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  city?: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  clientCellPhoneNumber?: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  address?: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  eamil?: string;
}
