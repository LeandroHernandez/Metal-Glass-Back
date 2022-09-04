import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPurchaseStatus } from 'src/common/interfaces/purchase-status.interface';
import { PURCHASES_STATUS } from 'src/common/models/models';
import { PurchaseStatusDTO } from './dto/purchase-status.dto';

@Injectable()
export class PurchaseStatusService {
  constructor(
    @InjectModel(PURCHASES_STATUS.name)
    private readonly _model: Model<IPurchaseStatus>,
  ) {}

  async create(
    purchase_statusDTO: PurchaseStatusDTO,
  ): Promise<IPurchaseStatus> {
    const newPurchase_status = new this._model({ ...purchase_statusDTO });
    return await newPurchase_status.save();
  }

  async findAll(): Promise<IPurchaseStatus[]> {
    return await this._model.find();
  }

  async findOne(id: string): Promise<IPurchaseStatus> {
    return await this._model.findById(id);
  }

  async update(
    id: string,
    purchase_statusDTO: PurchaseStatusDTO,
  ): Promise<IPurchaseStatus> {
    return this._model.findByIdAndUpdate(id, purchase_statusDTO, { new: true });
  }

  async delete(id: string) {
    await this._model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Delete' };
  }
}
