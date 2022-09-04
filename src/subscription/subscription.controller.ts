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
import { ISubscription } from 'src/common/interfaces/subscription.interface';
import { SubscriptionDTO } from './dto/subscription.dto';
import { SubscriptionService } from './subscription.service';

@ApiTags('subscription')
@Controller('api/v1/subscription')
export class SubscriptionController {
  constructor(private readonly _subscriptionSvc: SubscriptionService) {}

  @Post()
  @ApiOperation({ summary: ' Create User ' })
  create(@Body() subscriptionDTO: SubscriptionDTO): Promise<ISubscription> {
    return this._subscriptionSvc.create(subscriptionDTO);
  }

  @Get()
  @ApiOperation({ summary: ' Find All Users ' })
  findAll() {
    return this._subscriptionSvc.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: ' Find User ' })
  findOne(@Param('id') id: string): Promise<ISubscription> {
    return this._subscriptionSvc.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: ' Update User ' })
  update(
    @Param('id') id: string,
    @Body() subscriptionDTO: SubscriptionDTO,
  ): Promise<ISubscription> {
    return this._subscriptionSvc.update(id, subscriptionDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: ' Delete User ' })
  delete(@Param('id') id: string) {
    return this._subscriptionSvc.delete(id);
  }
}
