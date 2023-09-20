import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientService } from 'src/client/client.service';
import { IQuote } from 'src/common/interfaces/quote.interface';
import { QUOTE } from 'src/common/models/models';
import { QuoteDTO } from './dto/quote.dto';
import { QuoteFilterDTO } from './dto/quote-filter.dto';

@Injectable()
export class QuoteService {
  constructor(
    @InjectModel(QUOTE.name) private readonly _model: Model<IQuote>,
    private readonly _clientsSvc: ClientService,
  ) {}

  async create(quoteDTO: QuoteDTO): Promise<IQuote> {
    console.log({ quoteDTO });
    const newQuote = new this._model(quoteDTO);
    await newQuote.save();
    return await this._model
      .findByIdAndUpdate(
        newQuote.id,
        {
          $addToSet: { client: quoteDTO.client },
        },
        { new: true },
      )
      .populate('client');
  }

  async findAll(): Promise<IQuote[]> {
    return await this._model.find().populate('client');
  }

  async findOne(id: IQuote): Promise<IQuote> {
    return await this._model.findById(id).populate('client');
  }

  async update(id: string, quoteDTO: QuoteDTO): Promise<IQuote> {
    return this._model
      .findByIdAndUpdate(id, quoteDTO, { new: true })
      .populate('client');
  }

  async delete(id: string) {
    await this._model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Delete' };
  }

  async filtQuotes(body: QuoteFilterDTO): Promise<Array<IQuote>> {
    Object.keys(body).forEach((key) => {
      Array.isArray(body[key])
        ? body[key].forEach((item: any, i: number) => {
            body[key][i] = this.ValidateStringType(item);
          })
        : (body[key] = this.ValidateStringType(body[key]));
    });
    console.log({ body });
    console.log(body);
    return Object.keys(body).length > 0
      ? await this._model.find(body)
      : await this.findAll();
  }

  ValidateStringType(data: any): RegExp | any {
    if (typeof data === 'string' && data.length > 0) {
      return new RegExp(data);
    }
    return data;
  }
}
