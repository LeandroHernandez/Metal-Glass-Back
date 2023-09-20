import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAssignment } from 'src/common/interfaces/assignment.interface';
import { ASSIGNMENT } from 'src/common/models/models';
import { AssignmentDTO } from './dto/assignment.dto';
import { AssignmentFilterDTO } from './dto/assignment-filter.dto';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectModel(ASSIGNMENT.name) private readonly _model: Model<IAssignment>,
  ) {}

  async create(assignmentDTO: AssignmentDTO) {
    const newAssignment = new this._model(assignmentDTO);
    await newAssignment.save();
    return this.findOne(newAssignment.id);
  }

  async findAll(): Promise<IAssignment[]> {
    return await this._model.find();
  }

  async findOne(id: string): Promise<IAssignment> {
    return await this._model.findById(id);
  }

  async update(id: string, assignmentDTO: AssignmentDTO): Promise<IAssignment> {
    return await this._model.findByIdAndUpdate(id, assignmentDTO, {
      new: true,
    });
  }

  async delete(id: string) {
    await this._model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Delete' };
  }

  async findAllWhos(): Promise<string[]> {
    return await this._model.find({}, { whoAssigns: 1, _id: 0 });
  }

  async filtAsignments(body: AssignmentFilterDTO): Promise<Array<IAssignment>> {
    // Object.keys(body).forEach((key) => {
    //   Array.isArray(body[key])
    //     ? body[key].forEach((item: any, i: number) => {
    //         body[key][i] = this.ValidateStringType(item);
    //       })
    //     : (body[key] = this.ValidateStringType(body[key]));
    // });
    Object.keys(body).forEach((key) => {
      Array.isArray(body[key])
        ? false
        : (body[key] = this.ValidateStringType(body[key]));
    });
    console.log({ body });
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
