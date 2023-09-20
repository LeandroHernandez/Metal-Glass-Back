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
import { IAcrylic } from 'src/common/interfaces/acrylic.interface';
import { AcrylicService } from './acrylic.service';
import { AcrylicDTO } from './dto/acrylic.dto';

@ApiTags('acrylic')
@Controller('api/v1/acrylic')
export class AcrylicController {
  constructor(private readonly _acrylicSvc: AcrylicService) {}

  @Post()
  @ApiOperation({ summary: ' Create Acrylic ' })
  create(@Body() acrylicDTO: AcrylicDTO): Promise<IAcrylic> {
    return this._acrylicSvc.create(acrylicDTO);
  }

  @Get()
  @ApiOperation({ summary: ' Find All Acrylics ' })
  findAll() {
    return this._acrylicSvc.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: ' Find Acrylic ' })
  findOne(@Param('id') id: IAcrylic): Promise<IAcrylic> {
    return this._acrylicSvc.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: ' Update Acrylic ' })
  update(
    @Param('id') id: string,
    @Body() acrylicDTO: AcrylicDTO,
  ): Promise<IAcrylic> {
    return this._acrylicSvc.update(id, acrylicDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: ' Delete Acrylic ' })
  delete(@Param('id') id: string) {
    return this._acrylicSvc.delete(id);
  }
}
