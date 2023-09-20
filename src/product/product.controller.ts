/* eslint-disable prettier/prettier */
// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Post,
//   Put,
//   UploadedFiles,
//   UseInterceptors,
// } from '@nestjs/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
// import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IPhoto } from 'src/common/interfaces/photo.interface';
import { IProduct } from 'src/common/interfaces/product.interface';
import { ProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';
import { ProductFilterDTO } from './dto/product-filter.dto';

@ApiTags('Product')
@Controller('api/v1/product')
export class ProductController {
  constructor(private readonly _productSvc: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create Product' })
  async create(@Body() productDTO: ProductDTO): Promise<IProduct> {
    return await this._productSvc.create(productDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Find All Products' })
  async findAll(): Promise<IProduct[]> {
    return await this._productSvc.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find One Product' })
  async findOne(@Param('id') id: string): Promise<IProduct> {
    return await this._productSvc.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Product' })
  async update(
    @Param('id') id: string,
    @Body() productDTO: ProductDTO,
  ): Promise<IProduct> {
    return await this._productSvc.update(id, productDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Product' })
  async delete(@Param('id') id: string) {
    return await this._productSvc.delete(id);
  }

  @Get('addPhotoToProduct/:productId/:photoId')
  @ApiOperation({ summary: 'Add Photo To Product' })
  async addPhotosToProduct(
    @Param('productId') productId: string,
    @Param('photoId') photoId: IPhoto,
  ): Promise<IProduct> {
    return await this._productSvc.addPhotosToProduct(productId, photoId);
  }

  @Post('/filter')
  @ApiOperation({ summary: 'Filt Products' })
  async filtProducts(
    @Body() FilterDTO: ProductFilterDTO,
  ): Promise<Array<IProduct>> {
    return await this._productSvc.filtProducts(FilterDTO);
  }
}
