import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IEmployee } from 'src/common/interfaces/employee.interface';
import { IPhoto } from 'src/common/interfaces/photo.interface';
import { PurchaseDTO } from 'src/purchase/dto/purchase.dto';
import { EmployeeDTO } from './dto/employee.dto';
import { EmployeeService } from './employee.service';

@ApiTags('employee')
@Controller('api/v1/employee')
export class EmployeeController {
  constructor(private readonly _employeeSvc: EmployeeService) {}

  @Post()
  @ApiOperation({ summary: 'Create Employee' })
  async create(@Body() employeeDTO: EmployeeDTO): Promise<IEmployee> {
    return await this._employeeSvc.create(employeeDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Find All Employees' })
  async findAll(): Promise<IEmployee[]> {
    return await this._employeeSvc.findAll();
  }

  @Get('names')
  @ApiOperation({ summary: ' Find All Users Names' })
  findAllNames() {
    return this._employeeSvc.findAllNames();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find One Employee' })
  async findOne(@Param('id') id: string): Promise<IEmployee> {
    return await this._employeeSvc.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Employee' })
  async update(
    @Param('id') id: string,
    @Body() employeeDTO: EmployeeDTO,
  ): Promise<IEmployee> {
    // return await this._employeeSvc.update(id, employeeDTO);
    return await this._employeeSvc.update(id, employeeDTO, true);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Employee' })
  async delete(@Param('id') id: string) {
    return this._employeeSvc.delete(id);
  }

  @Post('registerPurchase')
  @ApiOperation({ summary: 'Update Employee' })
  async registerPurchase(@Body() purchaseDTO: PurchaseDTO) {
    return this._employeeSvc.registerPurchase(purchaseDTO);
  }

  @Get('addPhotoToEmployee/:employeeId/:photoId')
  @ApiOperation({ summary: 'Add Photo To Employee' })
  async addPhotosToEmployee(
    @Param('employeeId') employeeId: string,
    @Param('photoId') photoId: IPhoto,
  ): Promise<IEmployee> {
    return await this._employeeSvc.addPhotosToEmployee(employeeId, photoId);
  }

  @Post('filtEmployees')
  @ApiOperation({ summary: 'Filt employees' })
  async filtEmployees(@Body() body: JSON): Promise<IEmployee[]> {
    return await this._employeeSvc.filtEmpoyees(body);
  }
}
