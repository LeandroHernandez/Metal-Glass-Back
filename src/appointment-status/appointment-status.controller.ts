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
import { IAppointmentStatus } from 'src/common/interfaces/appointment-status.interface';
import { AppointmentStatusService } from './appointment-status.service';
import { AppointmentStatusDTO } from './dto/appointment-status.dto';

@ApiTags('appointment-status')
@Controller('api/v1/appointment-status')
export class AppointmentStatusController {
  constructor(
    private readonly _appointment_statusSvc: AppointmentStatusService,
  ) {}

  @Post()
  @ApiOperation({ summary: ' Create Purchase Status ' })
  create(
    @Body() appointment_statusDTO: AppointmentStatusDTO,
  ): Promise<IAppointmentStatus> {
    return this._appointment_statusSvc.create(appointment_statusDTO);
  }

  @Get()
  @ApiOperation({ summary: ' Find All Purchase Status ' })
  findAll(): Promise<IAppointmentStatus[]> {
    return this._appointment_statusSvc.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: ' Find One Purchase Status ' })
  findOne(@Param('id') id: string): Promise<IAppointmentStatus> {
    return this._appointment_statusSvc.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: ' Update Purchase Status ' })
  update(
    @Param('id') id: string,
    @Body() appointment_statusDTO: AppointmentStatusDTO,
  ): Promise<IAppointmentStatus> {
    return this._appointment_statusSvc.update(id, appointment_statusDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: ' Delete Purchase Status ' })
  delete(@Param('id') id: string) {
    return this._appointment_statusSvc.delete(id);
  }
}
