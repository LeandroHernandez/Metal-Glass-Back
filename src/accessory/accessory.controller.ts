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
import { IAccessory } from 'src/common/interfaces/accessory.interfaces';
import { AccessoryService } from './accessory.service';
import { AccessoryDTO } from './dto/accessory.dto';

@ApiTags('accessory')
@Controller('api/v1/accessory')
export class AccessoryController {
  constructor(private readonly _accessorySvc: AccessoryService) {}

  @Post()
  @ApiOperation({ summary: ' Create Accessory ' })
  create(@Body() accessoryDTO: AccessoryDTO): Promise<IAccessory> {
    return this._accessorySvc.create(accessoryDTO);
  }

  @Get()
  @ApiOperation({ summary: ' Find All Accessory ' })
  findAll() {
    return this._accessorySvc.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: ' Find Accessory ' })
  findOne(@Param('id') id: IAccessory): Promise<IAccessory> {
    return this._accessorySvc.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: ' Update Accessory ' })
  update(
    @Param('id') id: string,
    @Body() accessoryDTO: AccessoryDTO,
  ): Promise<IAccessory> {
    return this._accessorySvc.update(id, accessoryDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: ' Delete Accessory ' })
  delete(@Param('id') id: string) {
    return this._accessorySvc.delete(id);
  }
}
