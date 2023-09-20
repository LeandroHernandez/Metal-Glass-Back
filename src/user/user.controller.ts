import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
// import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
// import { IAssignment } from 'src/common/interfaces/assignment.interface';
import { IEmployee } from 'src/common/interfaces/employee.interface';
import { IPhoto } from 'src/common/interfaces/photo.interface';
import { IProduct } from 'src/common/interfaces/product.interface';
import { ITypeDocument } from 'src/common/interfaces/type-document.interface';
import { IUser } from 'src/common/interfaces/user.interface';
import { EmployeeDTO } from 'src/employee/dto/employee.dto';
import { ProductDTO } from 'src/product/dto/product.dto';
import { PurchaseDTO } from 'src/purchase/dto/purchase.dto';
import { TypeDocumentDTO } from 'src/type-document/dto/type-document.dto';
// import { RegisterAssignmentAndaddAdminsDTO } from './dto/registerAssignmentAndaddAdmins.dto';
// import { RegisterAssignmentAndaddAdminsAndEmployeesDTO } from './dto/registerAssignmentAndaddAdminsAndEmployees.dto';
// import { RegisterAssignmentAndaddEmployeesDTO } from './dto/registerAssignmentAndaddEmployees.dto';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/user')
export class UserController {
  constructor(private readonly _userSvc: UserService) {}

  @Post()
  @ApiOperation({ summary: ' Create User ' })
  create(@Body() userDTO: UserDTO): Promise<IUser> {
    return this._userSvc.create(userDTO);
  }

  @Get()
  @ApiOperation({ summary: ' Find All Users ' })
  findAll() {
    return this._userSvc.findAll();
  }

  @Get('names')
  @ApiOperation({ summary: ' Find All Users Names' })
  findAllNames() {
    return this._userSvc.findAllNames();
  }

  @Get(':id')
  @ApiOperation({ summary: ' Find User ' })
  findOne(@Param('id') id: IUser): Promise<IUser> {
    return this._userSvc.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: ' Update User ' })
  update(@Param('id') id: string, @Body() userDTO: UserDTO): Promise<IUser> {
    return this._userSvc.update(id, userDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: ' Delete User ' })
  delete(@Param('id') id: IUser) {
    return this._userSvc.delete(id);
  }

  @Get('addPhotoToUser/:userId/:photoId')
  @ApiOperation({ summary: 'Add Photo To User' })
  async addPhotosToUser(
    @Param('userId') userId: string,
    @Param('photoId') photoId: IPhoto,
  ): Promise<IUser> {
    return await this._userSvc.addPhotosToUser(userId, photoId);
  }

  @Post('RegisterDocumentType')
  @ApiOperation({ summary: ' Register Document Type ' })
  async registerDocumentType(
    @Body() typeDocumentDTO: TypeDocumentDTO,
  ): Promise<ITypeDocument> {
    return await this._userSvc.registerDocumentType(typeDocumentDTO);
  }

  @Post('RegisterEmployee')
  @ApiOperation({ summary: ' Register Employee ' })
  async registerEmployee(@Body() employeeDTO: EmployeeDTO): Promise<IEmployee> {
    return await this._userSvc.registerEmployee(employeeDTO);
  }

  @Post('RegisterPurchase')
  @ApiOperation({ summary: ' Register Purchase ' })
  async registerPurchase(@Body() purchaseDTO: PurchaseDTO): Promise<IUser> {
    return await this._userSvc.registerPurchase(purchaseDTO);
  }

  @Post('RegisterProduct')
  @ApiOperation({ summary: ' Register Product ' })
  async registerProduct(@Body() productDTO: ProductDTO): Promise<IProduct> {
    return await this._userSvc.registerProduct(productDTO);
  }

  // @Put('registerAssignmentAndaddAdmins/:id')
  // @ApiOperation({ summary: ' Register Assignment and add Admins ' })
  // registerAssignmentAndaddAdmins(
  //   @Param('id') id: string,
  //   @Body()
  //   registerAssignmentAndaddAdminsDTO: RegisterAssignmentAndaddAdminsDTO,
  // ): Promise<IUser> {
  //   return this._userSvc.registerAssignmentAndaddAdmins(
  //     id,
  //     registerAssignmentAndaddAdminsDTO,
  //   );
  // }

  // @Put('registerAssignmentAndaddEmployees/:id')
  // @ApiOperation({ summary: ' Register Assignment and add Employees ' })
  // registerAssignmentAndaddEmployees(
  //   @Param('id') id: string,
  //   @Body()
  //   registerAssignmentAndaddEmployeeDTO: RegisterAssignmentAndaddEmployeesDTO,
  // ): Promise<IUser> {
  //   return this._userSvc.registerAssignmentAndaddEmployees(
  //     id,
  //     registerAssignmentAndaddEmployeeDTO,
  //   );
  // }

  // @Put('registerAssignmentAndaddAdminsAndEmployees/:id')
  // @ApiOperation({
  //   summary: ' Register Assignment and add Admins and add Employees ',
  // })
  // registerAssignmentAndaddAdminsAndEmployees(
  //   @Param('id') id: string,
  //   @Body()
  //   registerAssignmentAndaddAdminsAndAddEmployeeDTO: RegisterAssignmentAndaddAdminsAndEmployeesDTO,
  // ): Promise<{ admin: IUser; assignment: IAssignment }> {
  //   return this._userSvc.registerAssignmentAndaddAdminsAndEmployees(
  //     id,
  //     registerAssignmentAndaddAdminsAndAddEmployeeDTO,
  //   );
  // }
}
