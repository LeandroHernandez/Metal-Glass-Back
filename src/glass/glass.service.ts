import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IGlass } from 'src/common/interfaces/glass.interface';
import { GLASS } from 'src/common/models/models';
import { GlassDTO } from './dto/glass.dto';

@Injectable()
export class GlassService {
  constructor(
    @InjectModel(GLASS.name) private readonly _model: Model<IGlass>,
  ) {}

  async create(glassDTO: GlassDTO): Promise<IGlass> {
    const newGlass = new this._model(glassDTO);
    return await newGlass.save();
  }

  async findAll(): Promise<IGlass[]> {
    return await this._model.find();
  }

  async findOne(id: IGlass): Promise<IGlass> {
    return await this._model.findById(id);
  }

  async update(id: string, glassDTO: GlassDTO): Promise<IGlass> {
    return this._model.findByIdAndUpdate(id, glassDTO, { new: true });
  }

  async delete(id: string) {
    await this._model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Delete' };
  }
}
