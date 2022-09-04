/* eslint-disable prettier/prettier */
import { HttpStatus, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { ESTABLISHMENT } from 'src/common/models/models';
import { Model } from 'mongoose';
import { IEstablishment } from 'src/common/interfaces/establishment.interface';
import { EstablishmentDTO } from './dto/establishment.dto';
import { EmployeeService } from 'src/employee/employee.service';
import { EmployeeDTO } from 'src/employee/dto/employee.dto';
import { CedeService } from 'src/cede/cede.service';
import { CedeDTO } from 'src/cede/dto/cede.dto';
import { ServiceService } from 'src/service/service.service';
import { ServiceDTO } from 'src/service/dto/service.dto';
import { ProductDTO } from 'src/product/dto/product.dto';
import { ProductService } from 'src/product/product.service';
import { ICede } from 'src/common/interfaces/cede.interface';
import { ServicesIdsDTO } from './dto/servicesIds.dto';
import { ProductsIdsDTO } from './dto/productsIds.dto';
import { ICategory } from 'src/common/interfaces/category.interface';
import { IUser } from 'src/common/interfaces/user.interface';

@Injectable()
export class EstablishmentService {
  constructor(
    @InjectModel(ESTABLISHMENT.name)
    private readonly _model: Model<IEstablishment>,
    private readonly _employeSvc: EmployeeService,
    private readonly _cedeSvc: CedeService,
    private readonly _serviceSvc: ServiceService,
    private readonly _productSvc: ProductService,
  ) {}

  async create(establishmentDTO: EstablishmentDTO): Promise<IEstablishment> {
    const newEstablishment = new this._model(establishmentDTO);
    return await newEstablishment.save();
  }

  async findAll(): Promise<IEstablishment[]> {
    return await this._model
      .find()
      .populate('owner')
      .populate('categorys')
      .populate('cedes')
      .populate('serviceCatalog')
      .populate('productCatalog')
      .populate('employees');
    // return await this._model.find().populate('cedes');
  }

  async findOne(id: string | IEstablishment): Promise<IEstablishment> {
    return await this._model
      .findById(id)
      .populate('owner')
      .populate('categorys')
      .populate('cedes')
      .populate('serviceCatalog')
      .populate('productCatalog')
      .populate('employees');
    // return await this._model.findById(id).populate('cedes');
  }

  async update(
    id: string,
    establishmentDTO: EstablishmentDTO,
  ): Promise<IEstablishment> {
    return this._model
      .findByIdAndUpdate(id, establishmentDTO, { new: true })
      .populate('owner')
      .populate('categorys')
      .populate('cedes')
      .populate('serviceCatalog')
      .populate('productCatalog')
      .populate('employees');
    // return this._model
    //   .findByIdAndUpdate(id, establishmentDTO, { new: true })
    //   .populate('cedes');
  }

  // async delete(id: string) {
  //   await this._model.findByIdAndDelete(id);
  //   return { status: HttpStatus.OK, msg: 'Delete' };
  // }

  async delete(id: string) {
    const establishment = await this.findOne(id);
    if (establishment.cedes) {
      establishment.cedes.forEach((cede) => {
        this._cedeSvc.delete(cede.id);
      });
    }
    if (establishment.employees) {
      establishment.employees.forEach((employee) => {
        this._employeSvc.delete(employee.id);
      });
    }
    if (establishment.productCatalog) {
      establishment.productCatalog.forEach((product) => {
        this._productSvc.delete(product.id);
      });
    }
    if (establishment.serviceCatalog) {
      establishment.serviceCatalog.forEach((service) => {
        this._serviceSvc.delete(service.id);
      });
    }
    await this._model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Delete' };
  }

  async addCategory(
    establishmentId: string,
    categoryId: ICategory,
  ): Promise<IEstablishment> {
    return this._model
      .findByIdAndUpdate(
        establishmentId,
        {
          $addToSet: { categorys: categoryId },
        },
        { new: true },
      )
      .populate('owner')
      .populate('categorys')
      .populate('cedes')
      .populate('serviceCatalog')
      .populate('productCatalog')
      .populate('employees');
  }

  async addOwner(
    establishmentId: string,
    ownerId: IUser,
  ): Promise<IEstablishment> {
    return this._model
      .findByIdAndUpdate(
        establishmentId,
        {
          $addToSet: { owner: ownerId },
        },
        { new: true },
      )
      .populate('owner')
      .populate('categorys')
      .populate('cedes')
      .populate('serviceCatalog')
      .populate('productCatalog')
      .populate('employees');
  }

  async createEmployee(
    establishmentId: string,
    employeeDTO: EmployeeDTO,
  ): Promise<IEstablishment> {
    const employee = await this._employeSvc.create(employeeDTO);
    return this._model
      .findByIdAndUpdate(
        establishmentId,
        {
          $addToSet: { employees: employee },
        },
        { new: true },
      )
      .populate('owner')
      .populate('categorys')
      .populate('cedes')
      .populate('serviceCatalog')
      .populate('productCatalog')
      .populate('employees');
  }

  // async createCede(
  //   establishmentId: string,
  //   cedeDTO: CedeDTO,
  // ): Promise<IEstablishment> {
  //   const cede = await this._cedeSvc.create(cedeDTO);
  //   return this._model
  //     .findByIdAndUpdate(
  //       establishmentId,
  //       {
  //         $addToSet: { cedes: cede.id },
  //       },
  //       { new: true },
  //     )
  //     .populate('owner')
  //     .populate('categorys')
  //     .populate('cedes')
  //     .populate('serviceCatalog')
  //     .populate('productCatalog')
  //     .populate('employees');
  // }

  async createCede(establishmentId: string, cedeDTO: CedeDTO): Promise<any> {
    const cede = await this._cedeSvc.create(cedeDTO);
    const establishment = await this._model
      .findByIdAndUpdate(
        establishmentId,
        {
          $addToSet: { cedes: cede },
        },
        { new: true },
      )
      .populate('owner')
      .populate('categorys')
      .populate('cedes')
      .populate('serviceCatalog')
      .populate('productCatalog')
      .populate('employees');
    return { establishment, cede };
  }

  async createService(
    establishmentId: string,
    serviceDTO: ServiceDTO,
  ): Promise<IEstablishment> {
    const service = await this._serviceSvc.create(serviceDTO);
    return this._model
      .findByIdAndUpdate(
        establishmentId,
        { $addToSet: { serviceCatalog: service.id } },
        { new: true },
      )
      .populate('owner')
      .populate('categorys')
      .populate('cedes')
      .populate('serviceCatalog')
      .populate('productCatalog')
      .populate('employees');
  }

  async createProduct(
    establishmentId: string,
    productDTO: ProductDTO,
  ): Promise<IEstablishment> {
    const product = await this._productSvc.create(productDTO);
    return this._model
      .findByIdAndUpdate(
        establishmentId,
        { $addToSet: { productCatalog: product.id } },
        { new: true },
      )
      .populate('owner')
      .populate('categorys')
      .populate('cedes')
      .populate('serviceCatalog')
      .populate('productCatalog')
      .populate('employees');
  }

  async assignServicesToCede(
    servicesIds: ServicesIdsDTO,
    cedeId: string,
  ): Promise<ICede> {
    return this._cedeSvc.assignServicesToCede(servicesIds, cedeId);
  }

  async assignProductsToCede(
    productsIds: ProductsIdsDTO,
    cedeId: string,
  ): Promise<ICede> {
    return this._cedeSvc.assignProductsToCede(productsIds, cedeId);
  }

  async addPhotosToEstablishment(
    establishmentId: string,
    photos: any,
  ): Promise<IEstablishment> {
    return await this._model
      .findByIdAndUpdate(
        establishmentId,
        { $addToSet: { photos: photos } },
        { new: true },
      )
      .populate('owner')
      .populate('categorys')
      .populate('cedes')
      .populate('serviceCatalog')
      .populate('productCatalog')
      .populate('employees');
  }
}
