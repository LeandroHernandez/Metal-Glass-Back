/* eslint-disable prettier/prettier */
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IService } from 'src/common/interfaces/service.interface';
import { SERVICE } from 'src/common/models/models';
import { ServiceDTO } from './dto/service.dto';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(SERVICE.name) private readonly _model: Model<IService>,
  ) {}

  async create(serviceDTO: ServiceDTO) {
    const newService = new this._model(serviceDTO);
    return await newService.save();
  }

  async findAll(): Promise<IService[]> {
    return await this._model.find();
  }

  async findOne(id: string): Promise<IService> {
    return await this._model.findById(id);
  }

  async update(id: string, serviceDTO: ServiceDTO): Promise<IService> {
    return await this._model.findByIdAndUpdate(id, serviceDTO, { new: true });
  }

  async delete(id: string) {
    await this._model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Delete' };
  }

  async addPhotosToService(serviceId: string, photos: any): Promise<IService> {
    return await this._model.findByIdAndUpdate(
      serviceId,
      { $addToSet: { photos: photos } },
      { new: true },
    );
  }
}
