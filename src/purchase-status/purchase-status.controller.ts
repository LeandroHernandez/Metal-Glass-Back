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
import { IPurchaseStatus } from 'src/common/interfaces/purchase-status.interface';
import { PurchaseStatusDTO } from './dto/purchase-status.dto';
import { PurchaseStatusService } from './purchase-status.service';

@ApiTags('purchase-status')
@Controller('api/v1/purchase-status')
export class PurchaseStatusController {
  constructor(private readonly _purchase_statusSvc: PurchaseStatusService) {}

  @Post()
  @ApiOperation({ summary: ' Create Purchase Status ' })
  create(
    @Body() purchase_statusDTO: PurchaseStatusDTO,
  ): Promise<IPurchaseStatus> {
    return this._purchase_statusSvc.create(purchase_statusDTO);
  }

  @Get()
  @ApiOperation({ summary: ' Find All Purchase Status ' })
  findAll(): Promise<IPurchaseStatus[]> {
    return this._purchase_statusSvc.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: ' Find One Purchase Status ' })
  findOne(@Param('id') id: string): Promise<IPurchaseStatus> {
    return this._purchase_statusSvc.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: ' Update Purchase Status ' })
  update(
    @Param('id') id: string,
    @Body() purchase_statusDTO: PurchaseStatusDTO,
  ): Promise<IPurchaseStatus> {
    return this._purchase_statusSvc.update(id, purchase_statusDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: ' Delete Purchase Status ' })
  delete(@Param('id') id: string) {
    return this._purchase_statusSvc.delete(id);
  }
}
