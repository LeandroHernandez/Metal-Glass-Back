import { HttpStatus, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { PURCHASES } from 'src/common/models/models';
import { Model } from 'mongoose';
import { IPurchase } from 'src/common/interfaces/purchase.interface';
import { PurchaseDTO } from './dto/purchase.dto';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectModel(PURCHASES.name)
    private readonly _model: Model<IPurchase>,
  ) {}

  async create(purchaseDTO: PurchaseDTO): Promise<IPurchase> {
    const newPurchase = new this._model(purchaseDTO);
    await this._model
      .findByIdAndUpdate(
        newPurchase.id,
        {
          $addToSet: {
            cede: purchaseDTO.cedeId,
            establishment: purchaseDTO.establishmentId,
            client: purchaseDTO.clientId,
            selectedProducts: purchaseDTO.selectedProducts,
          },
        },
        { new: true },
      )
      .populate('cede')
      .populate('establishment')
      .populate('selectedProducts')
      .populate('client');
    return await newPurchase.save();
  }

  async findAll(): Promise<IPurchase[]> {
    return await this._model
      .find()
      .populate('cede')
      .populate('establishment')
      .populate('selectedProducts')
      .populate('client');
  }

  async findOne(id: string): Promise<IPurchase> {
    return await this._model
      .findById(id)
      .populate('cede')
      .populate('establishment')
      .populate('selectedProducts')
      .populate('client');
  }

  async update(id: string, purchaseDTO: PurchaseDTO): Promise<IPurchase> {
    return this._model
      .findByIdAndUpdate(id, purchaseDTO, { new: true })
      .populate('cede')
      .populate('establishment')
      .populate('selectedProducts')
      .populate('client');
  }

  async delete(id: string) {
    await this._model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Delete' };
  }
}
