import { HttpStatus, Injectable } from '@nestjs/common';
import { EMPLOYEES } from 'src/common/models/models';
import { InjectModel } from '@nestjs/mongoose';
import { IEmployee } from 'src/common/interfaces/employee.interface';
import { Model } from 'mongoose';
import { EmployeeDTO } from './dto/employee.dto';

import * as bcrypt from 'bcrypt';
import { TypeDocumentService } from 'src/type-document/type-document.service';
import { PurchaseDTO } from 'src/purchase/dto/purchase.dto';
import { PurchaseService } from 'src/purchase/purchase.service';
import { IPhoto } from 'src/common/interfaces/photo.interface';
import { PhotoService } from 'src/photo/photo.service';
@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(EMPLOYEES.name) private readonly _model: Model<IEmployee>,
    private readonly _documentTypeSvc: TypeDocumentService,
    private readonly _photoSvc: PhotoService,
    private readonly _purchaseSvc: PurchaseService,
  ) {}

  async checkPassword(password: string, passwordDB: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordDB);
  }

  async findByUsername(username: string) {
    return await this._model.findOne({ username });
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
  async create(employeeDTO: EmployeeDTO): Promise<IEmployee> {
    const hash = await this.hashPassword(employeeDTO.password);
    const newEmployee = new this._model({ ...employeeDTO, password: hash });
    await newEmployee.save();
    const documentType = await this._documentTypeSvc.findOne(
      employeeDTO.documentTypeId,
    );
    return this._model
      .findByIdAndUpdate(
        newEmployee.id,
        {
          $addToSet: { documentType: documentType },
        },
        { new: true },
      )
      .populate('documentType')
      .populate('whatIHaveAssignedToOthers')
      .populate('whatOthersHaveAssignedToMe')
      .populate('historyOfAdvisedPurchases')
      .populate('historyOfCounselingAppointments')
      .populate('photos');
  }

  async findAll(): Promise<IEmployee[]> {
    return await this._model
      .find()
      .populate('documentType')
      .populate('whatIHaveAssignedToOthers')
      .populate('whatOthersHaveAssignedToMe')
      .populate('historyOfAdvisedPurchases')
      .populate('historyOfCounselingAppointments')
      .populate('photos');
  }

  async findAllNames(): Promise<IEmployee[]> {
    return await this._model.aggregate([
      { $project: { name: { $concat: ['$names', ' ', '$surnames'] }, _id: 0 } },
    ]);
  }

  // async findOne(id: string): Promise<IEmployee> {
  async findOne(id: string | IEmployee): Promise<IEmployee> {
    return await this._model
      .findById(id)
      .populate('documentType')
      .populate('whatIHaveAssignedToOthers')
      .populate('whatOthersHaveAssignedToMe')
      .populate('historyOfAdvisedPurchases')
      .populate('historyOfCounselingAppointments')
      .populate('photos');
  }

  async update(
    id: string,
    employeeDTO: EmployeeDTO,
    condition?: boolean,
  ): Promise<IEmployee> {
    return await this._model
      .findByIdAndUpdate(
        id,
        {
          ...employeeDTO,
          password: !condition
            ? await this.checkPassword(
                employeeDTO.password,
                (
                  await this._model.findById(id, { password: 1, _id: 0 })
                ).password,
              )
            : await this.hashPassword(employeeDTO.password),
          // ? employeeDTO.password
          // : await this.hashPassword(employeeDTO.password),
          documentType: employeeDTO.documentTypeId,
        },
        { new: true },
      )
      .populate('documentType')
      .populate('whatIHaveAssignedToOthers')
      .populate('whatOthersHaveAssignedToMe')
      .populate('historyOfAdvisedPurchases')
      .populate('historyOfCounselingAppointments')
      .populate('photos');
  }

  async delete(id: string) {
    const employee = await this.findOne(id);
    if (employee.photos) {
      employee.photos.forEach((photo) => {
        this._photoSvc.delete(photo.id);
      });
    }
    await this._model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Delete' };
  }

  async registerPurchase(purchaseDTO: PurchaseDTO): Promise<IEmployee> {
    const purchase = await this._purchaseSvc.create(purchaseDTO);
    return await this._model
      .findByIdAndUpdate(
        purchaseDTO.employeeId,
        { $addToSet: { historyOfAdvisedPurchases: purchase } },
        { new: true },
      )
      .populate('documentType')
      .populate('whatIHaveAssignedToOthers')
      .populate('whatOthersHaveAssignedToMe')
      .populate('historyOfAdvisedPurchases')
      .populate('historyOfCounselingAppointments')
      .populate('photos');
  }

  async addPhotosToEmployee(
    employeeId: string,
    photo: IPhoto,
  ): Promise<IEmployee> {
    return await this._model
      .findByIdAndUpdate(
        employeeId,
        { $addToSet: { photos: photo } },
        { new: true },
      )
      .populate('documentType')
      .populate('whatIHaveAssignedToOthers')
      .populate('whatOthersHaveAssignedToMe')
      .populate('historyOfAdvisedPurchases')
      .populate('historyOfCounselingAppointments')
      .populate('photos');
  }

  async addassignmentToEmployee(
    employeeId: string,
    assignment: string,
  ): Promise<IEmployee> {
    return await this._model
      .findByIdAndUpdate(
        employeeId,
        { $addToSet: { whatOthersHaveAssignedToMe: assignment } },
        { new: true },
      )
      .populate('documentType')
      .populate('whatIHaveAssignedToOthers')
      .populate('whatOthersHaveAssignedToMe')
      .populate('historyOfAdvisedPurchases')
      .populate('historyOfCounselingAppointments')
      .populate('photos');
  }

  async filtEmpoyees(body: JSON): Promise<IEmployee[]> {
    Object.keys(body).forEach((key) => {
      if (typeof body[key] === 'string' || typeof body[key] === 'number') {
        body[key] = new RegExp(body[key]);
      }
    });
    return await this._model
      .find(body)
      .populate('documentType')
      .populate('whatIHaveAssignedToOthers')
      .populate('whatOthersHaveAssignedToMe')
      .populate('historyOfAdvisedPurchases')
      .populate('historyOfCounselingAppointments')
      .populate('photos');
  }
}
