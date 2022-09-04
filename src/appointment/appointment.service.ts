import { HttpStatus, Injectable } from '@nestjs/common';
import { IAppointment } from 'src/common/interfaces/appointment.interface';
import { AppointmentDTO } from './dto/appointment.dto';

import { InjectModel } from '@nestjs/mongoose';
import { APPOINTMENT } from 'src/common/models/models';
import { Model } from 'mongoose';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(APPOINTMENT.name) private readonly _model: Model<IAppointment>,
  ) {}

  async create(appointmentDTO: AppointmentDTO): Promise<IAppointment> {
    const newAppointment = new this._model(appointmentDTO);
    await this._model
      .findByIdAndUpdate(
        newAppointment.id,
        {
          $addToSet: {
            cede: appointmentDTO.cedeId,
            establishment: appointmentDTO.establishmentId,
            client: appointmentDTO.clientId,
            selectedServices: appointmentDTO.selectedServices,
          },
        },
        { new: true },
      )
      .populate('cede')
      .populate('establishment')
      .populate('selectedServices')
      .populate('client');
    return await newAppointment.save();
  }

  async findAll(): Promise<IAppointment[]> {
    return await this._model
      .find()
      .populate('cede')
      .populate('establishment')
      .populate('selectedServices')
      .populate('client');
    // return await this._model.find().populate('categorys');
  }

  async findOne(id: string): Promise<IAppointment> {
    return await this._model
      .findById(id)
      .populate('cede')
      .populate('establishment')
      .populate('selectedServices')
      .populate('client');
    // return await this._model.findById(id).populate('categorys');
  }

  async update(
    id: string,
    appointmentDTO: AppointmentDTO,
  ): Promise<IAppointment> {
    return this._model
      .findByIdAndUpdate(id, appointmentDTO, { new: true })
      .populate('cede')
      .populate('establishment')
      .populate('selectedServices')
      .populate('client');
  }

  async delete(id: string) {
    await this._model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Delete' };
  }
}
