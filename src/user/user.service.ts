import { HttpStatus, Injectable } from '@nestjs/common';
import { IUser } from 'src/common/interfaces/user.interface';
import { UserDTO } from './dto/user.dto';

import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from 'src/common/models/models';
import { Model } from 'mongoose';
import { EstablishmentDTO } from 'src/establishment/dto/establishment.dto';
import { EstablishmentService } from 'src/establishment/establishment.service';
import { AppointmentDTO } from 'src/appointment/dto/appointment.dto';
import { AppointmentService } from 'src/appointment/appointment.service';
import { PurchaseDTO } from 'src/purchase/dto/purchase.dto';
import { PurchaseService } from 'src/purchase/purchase.service';
import { CedeService } from 'src/cede/cede.service';
import { IEstablishment } from 'src/common/interfaces/establishment.interface';
import { ISubscription } from 'src/common/interfaces/subscription.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER.name) private readonly _model: Model<IUser>,
    private readonly _establishmentSvc: EstablishmentService,
    private readonly _cedeSvc: CedeService,
    private readonly _appointmentSvc: AppointmentService,
    private readonly _purchaseSvc: PurchaseService,
  ) {}

  async checkPassword(password: string, passwordDB: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordDB);
  }

  async findByUsername(username: string) {
    // async findByEamil(email: string) {
    return await this._model.findOne({ username });
    // return await this._model.findOne({ email })
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
  async create(userDTO: UserDTO): Promise<IUser> {
    const hash = await this.hashPassword(userDTO.password);
    const newUser = new this._model({ ...userDTO, password: hash });
    return await newUser.save();
  }

  async findAll(): Promise<IUser[]> {
    return await this._model
      .find()
      .populate('establishments')
      .populate('requestedAppointments')
      .populate('requestedPurchases')
      .populate('subscription');
  }

  async findOne(id: IUser): Promise<IUser> {
    return await this._model
      .findById(id)
      .populate('establishments')
      .populate('requestedAppointments')
      .populate('requestedPurchases')
      .populate('subscription');
  }

  async update(id: string, userDTO: UserDTO): Promise<IUser> {
    const hash = await this.hashPassword(userDTO.password);
    const user = { ...userDTO, password: hash };
    return await this._model
      .findByIdAndUpdate(id, user, { new: true })
      .populate('establishments')
      .populate('requestedAppointments')
      .populate('requestedPurchases')
      .populate('subscription');
  }

  async delete(id: IUser) {
    const user = await this.findOne(id);
    if (user.establishments) {
      user.establishments.forEach((establishment) => {
        this._establishmentSvc.delete(establishment.id);
      });
    }
    if (user.subscription) {
      await this._model.findByIdAndUpdate(id, {
        $unset: { subscription: null },
      });
    }
    await this._model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Delete' };
  }

  async createEstablishment(
    userId: IUser,
    establishmentDTO: EstablishmentDTO,
  ): Promise<IUser> {
    let establishment = await this._establishmentSvc.create(establishmentDTO);
    establishment = await this._establishmentSvc.addOwner(
      establishment.id,
      userId,
    );
    return this._model
      .findByIdAndUpdate(
        userId,
        {
          $addToSet: { establishments: establishment },
        },
        { new: true },
      )
      .populate('establishments')
      .populate('requestedAppointments')
      .populate('requestedPurchases')
      .populate('subscription');
  }

  async createAppointment(appointmentDTO: AppointmentDTO): Promise<IUser> {
    const appointment = await this._cedeSvc.createAppointment(appointmentDTO);
    return this._model
      .findByIdAndUpdate(
        appointmentDTO.clientId,
        {
          $addToSet: { requestedAppointments: appointment },
        },
        { new: true },
      )
      .populate('establishments')
      .populate('requestedAppointments')
      .populate('requestedPurchases')
      .populate('subscription');
  }

  async createPurchase(purchaseDTO: PurchaseDTO): Promise<IUser> {
    const purchase = await this._purchaseSvc.create(purchaseDTO);
    return this._model
      .findByIdAndUpdate(
        purchaseDTO.clientId,
        {
          $addToSet: { requestedPurchases: purchase },
        },
        { new: true },
      )
      .populate('establishments')
      .populate('requestedAppointments')
      .populate('requestedPurchases')
      .populate('subscription');
  }

  async addEstablishment(
    userId: string,
    establishmentId: IEstablishment,
  ): Promise<IUser> {
    return await this._model
      .findByIdAndUpdate(
        userId,
        {
          $addToSet: { establishments: establishmentId },
        },
        { new: true },
      )
      .populate('establishments')
      .populate('requestedAppointments')
      .populate('requestedPurchases')
      .populate('subscription');
  }

  async addSubscription(
    userId: string,
    subscriptionId: ISubscription,
  ): Promise<IUser> {
    await this._model.findByIdAndUpdate(
      userId,
      {
        $unset: { subscription: null },
      },
      { new: true },
    );
    return await this._model
      .findByIdAndUpdate(
        userId,
        {
          $addToSet: { subscription: subscriptionId },
        },
        { new: true },
      )
      .populate('establishments')
      .populate('requestedAppointments')
      .populate('requestedPurchases')
      .populate('subscription');
  }
}
