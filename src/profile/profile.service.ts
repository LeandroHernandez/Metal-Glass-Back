import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProfile } from 'src/common/interfaces/profile.interface';
import { PROFILE } from 'src/common/models/models';
import { ProfileDTO } from './dto/profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(PROFILE.name) private readonly _model: Model<IProfile>,
  ) {}

  async create(profileDTO: ProfileDTO): Promise<IProfile> {
    const newProfile = new this._model(profileDTO);
    return await newProfile.save();
  }

  async findAll(): Promise<IProfile[]> {
    return await this._model.find();
  }

  async findOne(id: IProfile): Promise<IProfile> {
    return await this._model.findById(id);
  }

  async update(id: string, profileDTO: ProfileDTO): Promise<IProfile> {
    return this._model.findByIdAndUpdate(id, profileDTO, { new: true });
  }

  async delete(id: string) {
    await this._model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Delete' };
  }
}
