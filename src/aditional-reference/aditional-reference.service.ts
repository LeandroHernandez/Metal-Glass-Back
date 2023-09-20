import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAditionalReference } from 'src/common/interfaces/aditional-reference.interface';
import { ADITIONAL_REFERENCE } from 'src/common/models/models';
import { AditionalReferenceDTO } from './dto/aditional-reference.dto';

@Injectable()
export class AditionalReferenceService {
  constructor(
    @InjectModel(ADITIONAL_REFERENCE.name)
    private readonly _model: Model<IAditionalReference>,
  ) {}

  async create(
    aditionalReferenceDTO: AditionalReferenceDTO,
  ): Promise<IAditionalReference> {
    const newWindow = new this._model(aditionalReferenceDTO);
    return await newWindow.save();
  }

  async findAll(): Promise<IAditionalReference[]> {
    return await this._model.find();
  }

  async findOne(id: IAditionalReference): Promise<IAditionalReference> {
    return await this._model.findById(id);
  }

  async update(
    id: string,
    aditionalReferenceDTO: AditionalReferenceDTO,
  ): Promise<IAditionalReference> {
    return await this._model.findByIdAndUpdate(id, aditionalReferenceDTO, {
      new: true,
    });
  }

  async delete(id: string) {
    await this._model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Delete' };
  }
}
