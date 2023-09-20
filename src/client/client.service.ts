import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAppointment } from 'src/common/interfaces/appointment.interface';
import { IClient } from 'src/common/interfaces/client.interface';
import { IPurchase } from 'src/common/interfaces/purchase.interface';
import { CLIENT } from 'src/common/models/models';
import { TypeDocumentService } from 'src/type-document/type-document.service';
import { ClientDTO } from './dto/client.dto';

@Injectable()
// export class ClientService {}
export class ClientService {
  constructor(
    @InjectModel(CLIENT.name) private readonly _model: Model<IClient>,
    private readonly _documentTypeSvc: TypeDocumentService,
  ) {}
  async create(clientDTO: ClientDTO): Promise<IClient> {
    const newUser = new this._model(clientDTO);
    await newUser.save();
    const documentType = await this._documentTypeSvc.findOne(
      clientDTO.documentTypeId,
    );
    return this._model
      .findByIdAndUpdate(
        newUser.id,
        {
          $addToSet: { documentType: documentType },
        },
        { new: true },
      )
      .populate('documentType')
      .populate('shoppingHistory')
      .populate('datingHistory');
  }

  async findAll(): Promise<IClient[]> {
    return await this._model
      .find()
      .populate('documentType')
      .populate('shoppingHistory')
      .populate('datingHistory');
  }

  async findOne(id: IClient | string): Promise<IClient> {
    return await this._model
      .findById(id)
      .populate('documentType')
      .populate('shoppingHistory')
      .populate('datingHistory');
  }

  async update(id: string, clientDTO: ClientDTO): Promise<IClient> {
    const client = {
      ...clientDTO,
      documentType: clientDTO.documentTypeId,
    };
    return await this._model
      .findByIdAndUpdate(id, client, { new: true })
      .populate('documentType')
      .populate('shoppingHistory')
      .populate('datingHistory');
  }

  async delete(id: string) {
    await this._model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Delete' };
  }

  async assingPurchaseToClient(
    id: string,
    purchase: IPurchase,
  ): Promise<IClient> {
    const client = await this._model.findByIdAndUpdate(
      id,
      { $addToSet: { shoppingHistory: purchase } },
      { new: true },
    );
    return client;
  }

  async assingAppointmentToClient(
    id: string,
    appointment: IAppointment,
  ): Promise<IClient> {
    const client = await this._model.findByIdAndUpdate(
      id,
      { $addToSet: { datingHistory: appointment } },
      { new: true },
    );
    return client;
  }
}
