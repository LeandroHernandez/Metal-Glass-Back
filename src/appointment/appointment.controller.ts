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
import { IAppointment } from 'src/common/interfaces/appointment.interface';
import { AppointmentService } from './appointment.service';
import { AppointmentDTO } from './dto/appointment.dto';

@ApiTags('appointment')
@Controller('api/v1/appointment')
export class AppointmentController {
  constructor(private readonly _appointmentSvc: AppointmentService) {}

  @Post('client/:clientId/establishment/:establishmentId/cede/:cedeId')
  @ApiOperation({ summary: ' Create appointment ' })
  create(@Body() appointmentDTO: AppointmentDTO): Promise<IAppointment> {
    return this._appointmentSvc.create(appointmentDTO);
  }

  @Get()
  @ApiOperation({ summary: ' Find All appointments ' })
  findAll() {
    return this._appointmentSvc.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: ' Find appointment ' })
  findOne(@Param('id') id: string): Promise<IAppointment> {
    return this._appointmentSvc.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: ' Update appointment ' })
  update(
    @Param('id') id: string,
    @Body() appointmentDTO: AppointmentDTO,
  ): Promise<IAppointment> {
    return this._appointmentSvc.update(id, appointmentDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: ' Delete appointment ' })
  delete(@Param('id') id: string) {
    return this._appointmentSvc.delete(id);
  }
}
