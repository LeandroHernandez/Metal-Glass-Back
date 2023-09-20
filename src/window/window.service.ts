import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IWindow } from 'src/common/interfaces/window.interface';
import { WINDOW } from 'src/common/models/models';
import { WindowDTO } from './dto/window.dto';

@Injectable()
export class WindowService {
  constructor(
    @InjectModel(WINDOW.name) private readonly _model: Model<IWindow>,
  ) {}

  async create(windowDTO: WindowDTO): Promise<IWindow> {
    const newWindow = new this._model(windowDTO);
    return await newWindow.save();
    // return await this._model
    //   .findByIdAndUpdate(
    //     newWindow.id,
    //     {
    //       $addToSet: {
    //         accessories: windowDTO.accessories,
    //         profiles: windowDTO.profiles,
    //         glasses: windowDTO.glasses,
    //         acrylics: windowDTO.acrylics,
    //       },
    //     },
    //     { new: true },
    //   )
    //   .populate('accessories')
    //   .populate('profiles')
    //   .populate('glasses')
    //   .populate('acrylics');
  }

  async findAll(): Promise<IWindow[]> {
    return await this._model
      .find()
      .populate('accessories')
      .populate('profiles')
      .populate('glasses')
      .populate('acrylics');
  }

  async findOne(id: IWindow): Promise<IWindow> {
    return await this._model
      .findById(id)
      .populate('accessories')
      .populate('profiles')
      .populate('glasses')
      .populate('acrylics');
  }

  async update(id: string, windowDTO: WindowDTO): Promise<IWindow> {
    return await this._model
      .findByIdAndUpdate(
        id,
        {
          windowDTO,
        },
        { new: true },
      )
      .populate('accessories')
      .populate('profiles')
      .populate('glasses')
      .populate('acrylics');
  }

  async delete(id: string) {
    await this._model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Delete' };
  }
}
