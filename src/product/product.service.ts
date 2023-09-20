/* eslint-disable prettier/prettier */
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPhoto } from 'src/common/interfaces/photo.interface';
import { IProduct } from 'src/common/interfaces/product.interface';
import { PRODUCT } from 'src/common/models/models';
import { ProductDTO } from './dto/product.dto';
import { ProductFilterDTO } from './dto/product-filter.dto';

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
    return await this._model.find().populate('photos');
  }

  async findOne(id: string): Promise<IProduct> {
    return await this._model.findById(id).populate('photos');
  }

  async update(id: string, productDTO: ProductDTO): Promise<IProduct> {
    return await this._model
      .findByIdAndUpdate(id, productDTO, { new: true })
      .populate('photos');
  }

  async delete(id: string) {
    await this._model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Delete' };
  }

  async addPhotosToProduct(
    productId: string,
    photo: IPhoto,
  ): Promise<IProduct> {
    return await this._model
      .findByIdAndUpdate(
        productId,
        { $addToSet: { photos: photo } },
        { new: true },
      )
      .populate('photos');
  }

  async plusNumberOfRequests(
    id: IProduct | string,
    number: number,
  ): Promise<IProduct> {
    // const product = await this.findOne(id);
    const product = await this._model.findById(id);
    // const BefornumberOfRequests = product.numberOfRequests;
    let BefornumberOfRequests = product.numberOfRequests;
    if (
      !product.numberOfRequests ||
      typeof product.numberOfRequests !== 'number'
    ) {
      BefornumberOfRequests = 0;
    }
    product.numberOfRequests = BefornumberOfRequests + number;
    return await this._model.findByIdAndUpdate(id, product, { new: true });
  }

  async filtProducts(body: ProductFilterDTO): Promise<Array<IProduct>> {
    Object.keys(body).forEach((key) => {
      Array.isArray(body[key])
        ? body[key].forEach((item: any, i: number) => {
            body[key][i] = this.ValidateStringType(item);
          })
        : (body[key] = this.ValidateStringType(body[key]));
    });
    return Object.keys(body).length > 0
      ? await this._model.find(body).populate('photos')
      : await this.findAll();
  }

  ValidateStringType(data: any): RegExp | any {
    if (typeof data === 'string' && data.length > 0) {
      return new RegExp(data);
    }
    return data;
  }
}
