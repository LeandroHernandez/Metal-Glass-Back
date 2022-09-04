/* eslint-disable prettier/prettier */
// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Post,
//   Put,
//   UploadedFiles,
//   UseInterceptors,
// } from '@nestjs/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
// import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IService } from 'src/common/interfaces/service.interface';
import { ServiceDTO } from './dto/service.dto';
import { ServiceService } from './service.service';

@ApiTags('Service')
@Controller('api/v1/service')
export class ServiceController {
  constructor(private readonly _serviceSvc: ServiceService) {}

  @Post()
  @ApiOperation({ summary: 'Create Service' })
  async create(@Body() serviceDTO: ServiceDTO): Promise<IService> {
    return await this._serviceSvc.create(serviceDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Find All Services' })
  async findAll(): Promise<IService[]> {
    return await this._serviceSvc.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find One Service' })
  async findOne(@Param('id') id: string): Promise<IService> {
    return await this._serviceSvc.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Service' })
  async update(
    @Param('id') id: string,
    @Body() serviceDTO: ServiceDTO,
  ): Promise<IService> {
    return await this._serviceSvc.update(id, serviceDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Service' })
  async delete(@Param('id') id: string) {
    return await this._serviceSvc.delete(id);
  }

  // @Post('addPhotosToService/:id')
  // @ApiOperation({ summary: ' Add Photos To Establishment ' })
  // @UseInterceptors(FilesInterceptor('file'))
  // addPhotosToService(
  //   @Param('id') id: string,
  //   @UploadedFiles() photos: Express.Multer.File,
  // ): Promise<IService> {
  //   return this._serviceSvc.addPhotosToService(id, photos);
  // }
}
