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
import { IWindow } from 'src/common/interfaces/window.interface';
import { WindowDTO } from './dto/window.dto';
import { WindowService } from './window.service';

@ApiTags('window')
@Controller('api/v1/window')
export class WindowController {
  constructor(private readonly _windowSvc: WindowService) {}

  @Post()
  @ApiOperation({ summary: ' Create window ' })
  create(@Body() windowDTO: WindowDTO): Promise<IWindow> {
    return this._windowSvc.create(windowDTO);
  }

  @Get()
  @ApiOperation({ summary: ' Find All windows ' })
  findAll() {
    return this._windowSvc.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: ' Find window ' })
  findOne(@Param('id') id: IWindow): Promise<IWindow> {
    return this._windowSvc.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: ' Update window ' })
  update(
    @Param('id') id: string,
    @Body() windowDTO: WindowDTO,
  ): Promise<IWindow> {
    return this._windowSvc.update(id, windowDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: ' Delete window ' })
  delete(@Param('id') id: string) {
    return this._windowSvc.delete(id);
  }
}
