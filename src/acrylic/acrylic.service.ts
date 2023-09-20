import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAcrylic } from 'src/common/interfaces/acrylic.interface';
import { ACRYLIC } from 'src/common/models/models';
import { AcrylicDTO } from './dto/acrylic.dto';

@Injectable()
export class AcrylicService {
  constructor(
    @InjectModel(ACRYLIC.name) private readonly _model: Model<IAcrylic>,
  ) {}

  async create(acrylicDTO: AcrylicDTO): Promise<IAcrylic> {
    const newGlass = new this._model(acrylicDTO);
    return await newGlass.save();
  }

  async findAll(): Promise<IAcrylic[]> {
    return await this._model.find();
  }

  async findOne(id: IAcrylic): Promise<IAcrylic> {
    return await this._model.findById(id);
  }

  async update(id: string, acrylicDTO: AcrylicDTO): Promise<IAcrylic> {
    return this._model.findByIdAndUpdate(id, acrylicDTO, { new: true });
  }

  async delete(id: string) {
    await this._model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Delete' };
  }
}
