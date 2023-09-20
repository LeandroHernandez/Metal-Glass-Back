import { HttpStatus, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { PURCHASES } from 'src/common/models/models';
import { Model } from 'mongoose';
import { IPurchase } from 'src/common/interfaces/purchase.interface';
import { PurchaseDTO } from './dto/purchase.dto';
import { IProduct } from 'src/common/interfaces/product.interface';
import { ProductService } from 'src/product/product.service';
import { PurchaseFilterDTO } from './dto/purchase-filter.dto';

@Injectable()
export class PurchaseService {
  public listOfProductsToPurchase: Array<{
    product: IProduct;
    quantityOfThisProductInThePurchase: number;
  }> = [];
  constructor(
    @InjectModel(PURCHASES.name)
    private readonly _model: Model<IPurchase>,
    private readonly _productSvc: ProductService,
  ) {}

  async create(purchaseDTO: PurchaseDTO): Promise<IPurchase> {
    let newPurchase = new this._model(purchaseDTO);
    await newPurchase.save();
    newPurchase.selectedProducts.forEach(async (selectedProduct, i: number) => {
      const prod = await this._productSvc.plusNumberOfRequests(
        selectedProduct.product,
        selectedProduct.quantityOfThisProductInThePurchase,
      );
      newPurchase.selectedProducts[i].productName = prod.productName;
    });
    newPurchase = await this._model
      .findByIdAndUpdate(
        newPurchase.id,
        {
          $addToSet: {
            user: purchaseDTO.userId,
            employee: purchaseDTO.employeeId,
            client: purchaseDTO.clientId,
          },
        },
        { new: true },
      )
      .populate('user')
      .populate('employee')
      .populate('client')
      .populate('selectedProducts');
    return newPurchase;
  }

  async findAll(): Promise<IPurchase[]> {
    return await this._model
      .find()
      .populate('user')
      .populate('employee')
      .populate('client')
      .populate('selectedProducts');
  }

  async findOne(id: string): Promise<IPurchase> {
    return await this._model
      .findById(id)
      .populate('user')
      .populate('employee')
      .populate('client')
      .populate('selectedProducts');
  }

  async update(id: string, purchaseDTO: PurchaseDTO): Promise<IPurchase> {
    return await this._model
      .findByIdAndUpdate(
        id,
        {
          ...purchaseDTO,
          client: purchaseDTO.clientId,
        },
        { new: true },
      )
      .populate('user')
      .populate('employee')
      .populate('client')
      .populate('selectedProducts');
  }

  async delete(id: string) {
    await this._model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Delete' };
  }

  async filtPurchases(body: PurchaseFilterDTO): Promise<Array<IPurchase>> {
    Object.keys(body).forEach((key) => {
      Array.isArray(body[key])
        ? body[key].forEach((item: any, i: number) => {
            body[key][i] = this.ValidateStringType(item);
          })
        : (body[key] = this.ValidateStringType(body[key]));
    });
    console.log({ body });
    return Object.keys(body).length > 0
      ? await this._model
          .find(body)
          .populate('user')
          .populate('employee')
          .populate('client')
          .populate('selectedProducts')
      : await this.findAll();
  }

  ValidateStringType(data: any): RegExp | any {
    if (typeof data === 'string' && data.length > 0) {
      return new RegExp(data);
    }
    return data;
  }
}
