/* eslint-disable prettier/prettier */
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
import { ICede } from 'src/common/interfaces/cede.interface';
import { PhotoDTO } from 'src/photo/dto/photo.dto';
import { CedeService } from './cede.service';
import { CedeDTO } from './DTO/cede.DTO';

@ApiTags('cede')
// @ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@Controller('api/v1/cede')
export class CedeController {
  constructor(private readonly _cedeSvc: CedeService) {}

  @Post()
  @ApiOperation({ summary: ' Create Cede ' })
  create(@Body() cedeDTO: CedeDTO): Promise<ICede> {
    return this._cedeSvc.create(cedeDTO);
  }

  @Get()
  @ApiOperation({ summary: ' Find All Cedes ' })
  findAll() {
    return this._cedeSvc.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: ' Find Cede ' })
  findOne(@Param('id') id: string): Promise<ICede> {
    return this._cedeSvc.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: ' Update Cede ' })
  update(@Param('id') id: string, @Body() cedeDTO: CedeDTO): Promise<ICede> {
    return this._cedeSvc.update(id, cedeDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: ' Delete Cede ' })
  delete(@Param('id') id: string) {
    return this._cedeSvc.delete(id);
  }

  @Put('assignPhotosToCede/cedeId/:cedeId')
  @ApiOperation({ summary: ' Assign Photos To Cede ' })
  assignPhotosToCede(
    @Param('cedeId') cedeId: string,
    @Body() photoDTOs: PhotoDTO[],
  ): Promise<ICede> {
    return this._cedeSvc.assignPhotosToCede(photoDTOs, cedeId);
  }
}
