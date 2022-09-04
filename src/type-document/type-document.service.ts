import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITypeDocument } from 'src/common/interfaces/type-document.interface';
import { TYPE_DOCUMENT } from 'src/common/models/models';
import { TypeDocumentDTO } from './dto/type-document.dto';

@Injectable()
export class TypeDocumentService {
  constructor(
    @InjectModel(TYPE_DOCUMENT.name)
    private readonly _model: Model<ITypeDocument>,
  ) {}

  async create(type_documentDTO: TypeDocumentDTO): Promise<ITypeDocument> {
    const newPurchase_status = new this._model({ ...type_documentDTO });
    return await newPurchase_status.save();
  }

  async findAll(): Promise<ITypeDocument[]> {
    return await this._model.find();
  }

  async findOne(id: string): Promise<ITypeDocument> {
    return await this._model.findById(id);
  }

  async update(
    id: string,
    type_documentDTO: TypeDocumentDTO,
  ): Promise<ITypeDocument> {
    return this._model.findByIdAndUpdate(id, type_documentDTO, {
      new: true,
    });
  }

  async delete(id: string) {
    await this._model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Delete' };
  }
}
