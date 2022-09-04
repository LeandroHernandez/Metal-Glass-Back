import { HttpStatus, Injectable } from '@nestjs/common';
import { ISubscription } from 'src/common/interfaces/subscription.interface';
import { SubscriptionDTO } from './dto/subscription.dto';

import { InjectModel } from '@nestjs/mongoose';
import { SUBSCRIPTION } from 'src/common/models/models';
import { Model } from 'mongoose';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(SUBSCRIPTION.name)
    private readonly _model: Model<ISubscription>,
  ) {}

  async create(subsubscriptionDTO: SubscriptionDTO): Promise<ISubscription> {
    const newSubscription = new this._model({ subsubscriptionDTO });
    return await newSubscription.save();
  }

  async findAll(): Promise<ISubscription[]> {
    return await this._model.find();
  }

  async findOne(id: string | ISubscription): Promise<ISubscription> {
    return await this._model.findById(id);
  }

  async update(
    id: string,
    subscriptionDTO: SubscriptionDTO,
  ): Promise<ISubscription> {
    return this._model.findByIdAndUpdate(id, subscriptionDTO, { new: true });
  }

  async delete(id: string) {
    await this._model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Delete' };
  }
}
