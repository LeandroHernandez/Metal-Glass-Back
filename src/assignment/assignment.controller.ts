import { Controller } from '@nestjs/common';
import {
  Delete,
  Get,
  Post,
  Put,
} from '@nestjs/common/decorators/http/request-mapping.decorator';
import {
  Body,
  Param,
} from '@nestjs/common/decorators/http/route-params.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IAssignment } from 'src/common/interfaces/assignment.interface';
import { AssignmentService } from './assignment.service';
import { AssignmentDTO } from './dto/assignment.dto';
import { AssignmentFilterDTO } from './dto/assignment-filter.dto';

@ApiTags('Assignment')
@Controller('api/v1/assignment')
export class AssignmentController {
  constructor(private readonly _assignmentSvc: AssignmentService) {}

  @Post()
  @ApiOperation({ summary: 'Create Assignment' })
  async create(@Body() assignmentDTO: AssignmentDTO): Promise<IAssignment> {
    return await this._assignmentSvc.create(assignmentDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Find All Assignments' })
  async findAll(): Promise<IAssignment[]> {
    return await this._assignmentSvc.findAll();
  }

  // @Get(':id')
  @Get('findOne/:id')
  @ApiOperation({ summary: 'Find One Assignment' })
  async findOne(@Param('id') id: string): Promise<IAssignment> {
    return await this._assignmentSvc.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Assignment' })
  async update(
    @Param('id') id: string,
    @Body() assignmentDTO: AssignmentDTO,
  ): Promise<IAssignment> {
    return await this._assignmentSvc.update(id, assignmentDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Assignment' })
  async delete(@Param('id') id: string) {
    return await this._assignmentSvc.delete(id);
  }

  @Get('findAllWhos')
  @ApiOperation({ summary: 'Find All Whos' })
  async findAllWhos(): Promise<string[]> {
    const res = await this._assignmentSvc.findAllWhos();
    return res;
  }

  @Post('/filter')
  @ApiOperation({ summary: 'Filt Asignments' })
  async filtAsignments(
    @Body() FilterDTO: AssignmentFilterDTO,
  ): Promise<Array<IAssignment>> {
    return await this._assignmentSvc.filtAsignments(FilterDTO);
  }
}
