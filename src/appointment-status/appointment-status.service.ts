import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAppointmentStatus } from 'src/common/interfaces/appointment-status.interface';
import { APPOINTMENT_STATUS } from 'src/common/models/models';
import { AppointmentStatusDTO } from './dto/appointment-status.dto';

@Injectable()
export class AppointmentStatusService {
  constructor(
    @InjectModel(APPOINTMENT_STATUS.name)
    private readonly _model: Model<IAppointmentStatus>,
  ) {}

  async create(
    appointment_statusDTO: AppointmentStatusDTO,
  ): Promise<IAppointmentStatus> {
    const newPurchase_status = new this._model({ ...appointment_statusDTO });
    return await newPurchase_status.save();
  }

  async findAll(): Promise<IAppointmentStatus[]> {
    return await this._model.find();
  }

  async findOne(id: string): Promise<IAppointmentStatus> {
    return await this._model.findById(id);
  }

  async update(
    id: string,
    appointment_statusDTO: AppointmentStatusDTO,
  ): Promise<IAppointmentStatus> {
    return this._model.findByIdAndUpdate(id, appointment_statusDTO, {
      new: true,
    });
  }

  async delete(id: string) {
    await this._model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Delete' };
  }
}
