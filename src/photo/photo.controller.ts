import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { IPhoto } from 'src/common/interfaces/photo.interface';
import { PhotoDTO } from './dto/photo.dto';
import { PhotoService } from './photo.service';

@Controller('api/v1/photo')
export class PhotoController {
  constructor(private readonly _photoSvc: PhotoService) {}

  @Post()
  @ApiOperation({ summary: ' Create Photo ' })
  // create(@Body() photoDTO: PhotoDTO): string {
  create(): string {
    // return this._photoSvc.create(photoDTO);
    return 'Este metodo del controlador se encuentra inhabilitado ';
  }

  @Get()
  @ApiOperation({ summary: ' Find All Photos ' })
  findAll() {
    return this._photoSvc.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: ' Find Photo ' })
  findOne(@Param('id') id: IPhoto): Promise<IPhoto> {
    return this._photoSvc.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: ' Update Photo ' })
  update(@Param('id') id: IPhoto, @Body() photoDTO: PhotoDTO): Promise<IPhoto> {
    return this._photoSvc.update(id, photoDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: ' Delete Photo ' })
  delete(@Param('id') id: string) {
    return this._photoSvc.delete(id);
  }
}
