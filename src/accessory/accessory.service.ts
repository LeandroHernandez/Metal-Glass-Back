import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAccessory } from 'src/common/interfaces/accessory.interfaces';
import { ACCESSORY } from 'src/common/models/models';
import { AccessoryDTO } from './dto/accessory.dto';

@Injectable()
export class AccessoryService {
  constructor(
    @InjectModel(ACCESSORY.name) private readonly _model: Model<IAccessory>,
  ) {}

  async create(accessoryDTO: AccessoryDTO): Promise<IAccessory> {
    const newAccessory = new this._model(accessoryDTO);
    return await newAccessory.save();
  }

  async findAll(): Promise<IAccessory[]> {
    return await this._model.find();
  }

  async findOne(id: IAccessory): Promise<IAccessory> {
    return await this._model.findById(id);
  }

  async update(id: string, accessoryDTO: AccessoryDTO): Promise<IAccessory> {
    return this._model.findByIdAndUpdate(id, accessoryDTO, { new: true });
  }

  async delete(id: string) {
    await this._model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Delete' };
  }
}
