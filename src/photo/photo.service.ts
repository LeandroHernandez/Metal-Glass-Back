import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPhoto } from 'src/common/interfaces/photo.interface';
import { PHOTO } from 'src/common/models/models';
import { PhotoDTO } from './dto/photo.dto';

@Injectable()
export class PhotoService {
  constructor(
    @InjectModel(PHOTO.name) private readonly _model: Model<IPhoto>,
  ) {}

  async create(photoDTO: PhotoDTO): Promise<IPhoto> {
    const newPhoto = new this._model(photoDTO);
    return await newPhoto.save();
  }

  async findAll(): Promise<IPhoto[]> {
    return await this._model.find();
    // return await this._model.find().populate('categorys');
  }

  async findOne(id: IPhoto): Promise<IPhoto> {
    return await this._model.findById(id);
    // return await this._model.findById(id).populate('categorys');
  }

  async update(id: IPhoto, photoDTO: PhotoDTO): Promise<IPhoto> {
    return this._model.findByIdAndUpdate(id, photoDTO, { new: true });
  }

  async delete(id: string) {
    await this._model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Delete' };
  }
}
