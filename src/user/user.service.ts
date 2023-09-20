import { HttpStatus, Injectable } from '@nestjs/common';
import { IUser } from 'src/common/interfaces/user.interface';
import { UserDTO } from './dto/user.dto';

import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from 'src/common/models/models';
import { Model } from 'mongoose';
import { PhotoService } from 'src/photo/photo.service';
import { IPhoto } from 'src/common/interfaces/photo.interface';
import { TypeDocumentDTO } from 'src/type-document/dto/type-document.dto';
import { TypeDocumentService } from 'src/type-document/type-document.service';
import { ITypeDocument } from 'src/common/interfaces/type-document.interface';
import { EmployeeService } from 'src/employee/employee.service';
import { ProductService } from 'src/product/product.service';
import { EmployeeDTO } from 'src/employee/dto/employee.dto';
import { IEmployee } from 'src/common/interfaces/employee.interface';
import { ProductDTO } from 'src/product/dto/product.dto';
import { IProduct } from 'src/common/interfaces/product.interface';
import { PurchaseDTO } from 'src/purchase/dto/purchase.dto';
import { PurchaseService } from 'src/purchase/purchase.service';
import { AssignmentService } from 'src/assignment/assignment.service';
// import { IAssignment } from 'src/common/interfaces/assignment.interface';
// import { RegisterAssignmentAndaddAdminsDTO } from './dto/registerAssignmentAndaddAdmins.dto';
// import { RegisterAssignmentAndaddAdminsAndEmployeesDTO } from './dto/registerAssignmentAndaddAdminsAndEmployees.dto';
// import { RegisterAssignmentAndaddEmployeesDTO } from './dto/registerAssignmentAndaddEmployees.dto';
import { MailService } from '@sendgrid/mail';

@Injectable()
export class UserService {
  private user: IUser | null = null;
  constructor(
    @InjectModel(USER.name) private readonly _model: Model<IUser>,
    private readonly _photoSvc: PhotoService,
    private readonly _typeDocumentSvc: TypeDocumentService,
    private readonly _employeeSvc: EmployeeService,
    private readonly _productSvc: ProductService,
    private readonly _purchaseSvc: PurchaseService,
    private readonly _assignmentSvc: AssignmentService,
    private readonly _mailSvc: MailService,
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
  async create(userDTO: UserDTO): Promise<IUser> {
    const hash = await this.hashPassword(userDTO.password);
    const newUser = new this._model({ ...userDTO, password: hash });
    await newUser.save();
    const documentType = await this._typeDocumentSvc.findOne(
      userDTO.documentTypeId,
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
      .populate('whatIHaveAssignedToOthers')
      .populate('whatOthersHaveAssignedToMe')
      .populate('photos');
  }

  async findAll(): Promise<IUser[]> {
    return await this._model
      .find()
      .populate('documentType')
      .populate('documentType')
      .populate('whatIHaveAssignedToOthers')
      .populate('whatOthersHaveAssignedToMe')
      .populate('photos');
  }

  async findAllNames(): Promise<IUser[]> {
    return await this._model.aggregate([
      { $project: { name: { $concat: ['$names', ' ', '$surnames'] }, _id: 0 } },
    ]);
  }

  async findOne(id: IUser): Promise<IUser> {
    return await this._model
      .findById(id)
      .populate('documentType')
      .populate('whatIHaveAssignedToOthers')
      .populate('whatOthersHaveAssignedToMe')
      .populate('photos');
  }

  async update(id: string, userDTO: UserDTO): Promise<IUser> {
    const hash = await this.hashPassword(userDTO.password);
    const user = {
      ...userDTO,
      password: hash,
      documentType: userDTO.documentTypeId,
    };
    return await this._model
      .findByIdAndUpdate(id, user, { new: true })
      .populate('documentType')
      .populate('whatIHaveAssignedToOthers')
      .populate('whatOthersHaveAssignedToMe')
      .populate('photos');
  }

  async delete(id: IUser) {
    const user = await this.findOne(id);
    if (user.photos) {
      user.photos.forEach((photo) => {
        this._photoSvc.delete(photo.id);
      });
    }
    await this._model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Delete' };
  }

  async addPhotosToUser(userId: string, photo: IPhoto): Promise<IUser> {
    return await this._model
      .findByIdAndUpdate(
        userId,
        { $addToSet: { photos: photo } },
        { new: true },
      )
      .populate('documentType')
      .populate('whatIHaveAssignedToOthers')
      .populate('whatOthersHaveAssignedToMe')
      .populate('photos');
  }

  async registerDocumentType(
    typeDocumentDTO: TypeDocumentDTO,
  ): Promise<ITypeDocument> {
    const documentType = await this._typeDocumentSvc.create(typeDocumentDTO);
    return documentType;
  }

  async registerEmployee(employeeDTO: EmployeeDTO): Promise<IEmployee> {
    const employee = await this._employeeSvc.create(employeeDTO);
    return employee;
  }

  async registerProduct(productDTO: ProductDTO): Promise<IProduct> {
    const product = await this._productSvc.create(productDTO);
    return product;
  }

  async registerPurchase(purchaseDTO: PurchaseDTO): Promise<IUser> {
    const purchase = await this._purchaseSvc.create(purchaseDTO);
    return await this._model
      .findByIdAndUpdate(
        purchaseDTO.userId,
        { $addToSet: { historyOfAdvisedPurchases: purchase } },
        { new: true },
      )
      .populate('documentType')
      .populate('whatIHaveAssignedToOthers')
      .populate('whatOthersHaveAssignedToMe')
      .populate('photos');
  }

  async validateDocument(validateDTO: {
    typeDocument: string | any;
    documentNumber: string | any;
  }): Promise<IUser | null> {
    const user = await this._model.findOne(validateDTO);
    console.log({ validateDTO, user });
    return user;
    // await this._model
    //   .findByIdAndUpdate(
    //     purchaseDTO.userId,
    //     { $addToSet: { historyOfAdvisedPurchases: purchase } },
    //     { new: true },
    //   )
    //   .populate('documentType')
    //   .populate('whatIHaveAssignedToOthers')
    //   .populate('whatOthersHaveAssignedToMe')
    //   .populate('photos');
  }

  async generatePassword(id: IUser | any, email: string): Promise<string> {
    // const email = this._model.findById(id, { email: 1, _id: 0 });
    const password = Math.random().toString(36).substring(2, 12);
    const hash = await this.hashPassword(password);
    // console.log({ id, email: email, password, hash });
    await this._model.findByIdAndUpdate(id, { password: hash }, { new: true });
    // const purchase = await this._purchaseSvc.create(purchaseDTO);
    this._mailSvc.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      // to: 'juliethm04052003@gmail.com', // Change to your recipient
      to: `${email}`, // Change to your recipient
      from: 'johanhernandezvelez@gmail.com', // Change to your verified sender
      subject: 'Generación de clave',
      text: 'METAL GLASS',
      html: `<p>Aquí está su nueva clave: <b>${password}</b> 
      procure cambiarla a una que pueda recordar facilmente</p>`,
    };
    this._mailSvc
      .send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error(error);
      });
    return password;
  }
}
