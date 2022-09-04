import { HttpStatus, Injectable } from '@nestjs/common';
import { ICategory } from 'src/common/interfaces/category.interface';
import { CategoryDTO } from './dto/category.dto';

import { InjectModel } from '@nestjs/mongoose';
import { CATEGORY } from 'src/common/models/models';
import { Model } from 'mongoose';

//

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(CATEGORY.name) private readonly _model: Model<ICategory>,
  ) {}

  async create(categoryDTO: CategoryDTO): Promise<ICategory> {
    const newCategory = new this._model(categoryDTO);
    return await newCategory.save();
  }

  async findAll(): Promise<ICategory[]> {
    return await this._model
      .find()
      .populate('subCategorys')
      .populate('fatherCategory');
    // return await this._model.find().populate('categorys');
  }

  async findOne(id: ICategory): Promise<ICategory> {
    return await this._model.findById(id);
    // return await this._model.findById(id).populate('categorys');
  }

  async update(id: ICategory, categoryDTO: CategoryDTO): Promise<ICategory> {
    return this._model.findByIdAndUpdate(id, categoryDTO, { new: true });
  }

  async delete(id: string) {
    await this._model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Delete' };
  }

  async addSubCategory(
    fatherId: ICategory,
    sonId: ICategory,
  ): Promise<ICategory> {
    await this.addFatherCategory(fatherId, sonId);
    return await this._model
      .findByIdAndUpdate(
        fatherId,
        {
          $addToSet: { subCategorys: sonId },
        },
        { new: true },
      )
      .populate('subCategorys')
      .populate('fatherCategory');
  }

  async addFatherCategory(
    fatherId: ICategory,
    sonId: ICategory,
  ): Promise<ICategory> {
    return await this._model.findByIdAndUpdate(
      sonId,
      {
        $addToSet: { fatherCategory: fatherId },
      },
      { new: true },
    );
  }
}
