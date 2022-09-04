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
import { IPurchase } from 'src/common/interfaces/purchase.interface';
import { PurchaseDTO } from './dto/purchase.dto';
import { PurchaseService } from './purchase.service';

@ApiTags('purchase')
@Controller('api/v1/purchase')
export class PurchaseController {
  constructor(private readonly _purchasetSvc: PurchaseService) {}

  @Post()
  @ApiOperation({ summary: ' Create Purchase ' })
  create(@Body() purchaseDTO: PurchaseDTO): Promise<IPurchase> {
    return this._purchasetSvc.create(purchaseDTO);
  }

  @Get()
  @ApiOperation({ summary: ' Find All Purchases ' })
  findAll() {
    return this._purchasetSvc.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: ' Find Purchase ' })
  findOne(@Param('id') id: string): Promise<IPurchase> {
    return this._purchasetSvc.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: ' Update Purchase ' })
  update(
    @Param('id') id: string,
    @Body() purchaseDTO: PurchaseDTO,
  ): Promise<IPurchase> {
    return this._purchasetSvc.update(id, purchaseDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: ' Delete Purchase ' })
  delete(@Param('id') id: string) {
    return this._purchasetSvc.delete(id);
  }
}
