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
    return await this._employeeSvc.update(id, employeeDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delte Employee' })
  async delete(@Param('id') id: string) {
    return this._employeeSvc.delete(id);
  }
}
