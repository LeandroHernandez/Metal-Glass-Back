/* eslint-disable prettier/prettier */
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProduct } from 'src/common/interfaces/product.interface';
import { PRODUCT } from 'src/common/models/models';
import { ProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(PRODUCT.name) private readonly _model: Model<IProduct>,
  ) {}

  async create(productDTO: ProductDTO) {
    const newProduct = new this._model(productDTO);
    return await newProduct.save();
  }

  async findAll(): Promise<IProduct[]> {
    return await this._model.find();
  }

  async findOne(id: string): Promise<IProduct> {
    return await this._model.findById(id);
  }

  async update(id: string, productDTO: ProductDTO): Promise<IProduct> {
    return await this._model.findByIdAndUpdate(id, productDTO, { new: true });
  }

  async delete(id: string) {
    await this._model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Delete' };
  }

  async addPhotosToProduct(productId: string, photos: any): Promise<IProduct> {
    return await this._model.findByIdAndUpdate(
      productId,
      { $addToSet: { photos: photos } },
      { new: true },
    );
  }
}
