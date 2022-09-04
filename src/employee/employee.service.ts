import { HttpStatus, Injectable } from '@nestjs/common';
import { EMPLOYEES } from 'src/common/models/models';
import { InjectModel } from '@nestjs/mongoose';
import { IEmployee } from 'src/common/interfaces/employee.interface';
import { Model } from 'mongoose';
import { EmployeeDTO } from './dto/employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(EMPLOYEES.name) private readonly _model: Model<IEmployee>,
  ) {}

  async create(employeeDTO: EmployeeDTO): Promise<IEmployee> {
    const newEmployee = new this._model(employeeDTO);
    return await newEmployee.save();
  }

  async findAll(): Promise<IEmployee[]> {
    return await this._model.find();
  }

  async findOne(id: string): Promise<IEmployee> {
    return await this._model.findById(id);
  }

  async update(id: string, employeeDTO: EmployeeDTO): Promise<IEmployee> {
    return await this._model.findByIdAndUpdate(id, employeeDTO, { new: true });
  }

  async delete(id: string) {
    await this._model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Delete' };
  }
}
