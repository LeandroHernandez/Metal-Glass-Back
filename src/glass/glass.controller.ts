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
import { IGlass } from 'src/common/interfaces/glass.interface';
import { GlassDTO } from './dto/glass.dto';
import { GlassService } from './glass.service';

@ApiTags('glass')
@Controller('api/v1/glass')
export class GlassController {
  constructor(private readonly _glassSvc: GlassService) {}

  @Post()
  @ApiOperation({ summary: ' Create Glass ' })
  create(@Body() glassDTO: GlassDTO): Promise<IGlass> {
    return this._glassSvc.create(glassDTO);
  }

  @Get()
  @ApiOperation({ summary: ' Find All Glasses ' })
  findAll() {
    return this._glassSvc.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: ' Find Glass ' })
  findOne(@Param('id') id: IGlass): Promise<IGlass> {
    return this._glassSvc.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: ' Update Glass ' })
  update(@Param('id') id: string, @Body() glassDTO: GlassDTO): Promise<IGlass> {
    return this._glassSvc.update(id, glassDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: ' Delete Glass ' })
  delete(@Param('id') id: string) {
    return this._glassSvc.delete(id);
  }
}
