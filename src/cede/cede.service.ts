/* eslint-disable prettier/prettier */
import { HttpStatus, Injectable } from '@nestjs/common';
import { ICede } from 'src/common/interfaces/cede.interface';
import { CedeDTO } from './dto/cede.dto';

import { InjectModel } from '@nestjs/mongoose';
import { CEDE } from 'src/common/models/models';
import { Model } from 'mongoose';
import { AppointmentService } from 'src/appointment/appointment.service';
import { AppointmentDTO } from 'src/appointment/dto/appointment.dto';
import { IAppointment } from 'src/common/interfaces/appointment.interface';
import { ServicesIdsDTO } from 'src/establishment/dto/servicesIds.dto';
import { ProductsIdsDTO } from 'src/establishment/dto/productsIds.dto';
import { PhotoService } from 'src/photo/photo.service';
import { PhotoDTO } from 'src/photo/dto/photo.dto';

require('multer');

@Injectable()
export class CedeService {
  constructor(
    @InjectModel(CEDE.name) private readonly _model: Model<ICede>,
    private readonly _appointmentSvc: AppointmentService,
    private readonly _photoSvc: PhotoService,
  ) {}
  async create(cedeDTO: CedeDTO): Promise<ICede> {
    const newCede = new this._model(cedeDTO);
    return await newCede.save();
  }

  async findAll(): Promise<ICede[]> {
    return await this._model
      .find()
      .populate('photos')
      .populate('servicesCatalog')
      .populate('productsCatalog')
      .populate('datingHistory');
  }

  async findOne(id: string): Promise<ICede> {
    return await this._model
      .findById(id)
      .populate('photos')
      .populate('servicesCatalog')
      .populate('productsCatalog')
      .populate('datingHistory');
  }

  async update(id: string, cedeDTO: CedeDTO): Promise<ICede> {
    return await this._model
      .findByIdAndUpdate(id, cedeDTO, { new: true })
      .populate('photos')
      .populate('servicesCatalog')
      .populate('productsCatalog')
      .populate('datingHistory');
  }

  async delete(id: string) {
    await this._model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Delete' };
  }

  async createAppointment(
    appointmentDTO: AppointmentDTO,
  ): Promise<IAppointment> {
    const appointment = await this._appointmentSvc.create(appointmentDTO);
    this._model
      .findByIdAndUpdate(
        appointmentDTO.cedeId,
        { $addToSet: { datingHistory: appointment } },
        { new: true },
      )
      .populate('photos')
      .populate('servicesCatalog')
      .populate('productsCatalog')
      .populate('datingHistory');
    return appointment;
  }

  async assignServicesToCede(
    servicesIds: ServicesIdsDTO,
    cedeId: string,
  ): Promise<ICede> {
    return this._model
      .findByIdAndUpdate(
        cedeId,
        { $addToSet: { servicesCatalog: servicesIds.servicesIds } },
        { new: true },
      )
      .populate('photos')
      .populate('servicesCatalog')
      .populate('productsCatalog')
      .populate('datingHistory');
  }

  async assignProductsToCede(
    productsIds: ProductsIdsDTO,
    cedeId: string,
  ): Promise<ICede> {
    return this._model
      .findByIdAndUpdate(
        cedeId,
        { $addToSet: { productsCatalog: productsIds.productsIds } },
        { new: true },
      )
      .populate('photos')
      .populate('servicesCatalog')
      .populate('productsCatalog')
      .populate('datingHistory');
  }

  async assignPhotosToCede(
    photoDTOs: PhotoDTO[],
    cedeId: string,
  ): Promise<ICede> {
    // console.log({ photoDTOsNumber: photoDTOs.length });
    photoDTOs.forEach(async (photoDTO) => {
      const photo = await this._photoSvc.create(photoDTO);
      await this._model
        .findByIdAndUpdate(
          cedeId,
          { $addToSet: { photos: photo } },
          { new: true },
        )
        .populate('photos')
        .populate('servicesCatalog')
        .populate('productsCatalog')
        .populate('datingHistory');
    });
    return await this.findOne(cedeId);
  }
}
