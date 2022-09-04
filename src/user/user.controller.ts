// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   HttpException,
//   HttpStatus,
//   Param,
//   Post,
//   Put,
//   UseGuards,
// } from '@nestjs/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
// import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppointmentDTO } from 'src/appointment/dto/appointment.dto';
// import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IEstablishment } from 'src/common/interfaces/establishment.interface';
import { ISubscription } from 'src/common/interfaces/subscription.interface';
import { IUser } from 'src/common/interfaces/user.interface';
import { EstablishmentDTO } from 'src/establishment/dto/establishment.dto';
import { EstablishmentService } from 'src/establishment/establishment.service';
import { PurchaseDTO } from 'src/purchase/dto/purchase.dto';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('api/v1/user')
export class UserController {
  constructor(
    private readonly _userSvc: UserService,
    private readonly _establishmentSvc: EstablishmentService,
    private readonly _subscriptionSvc: SubscriptionService,
  ) {}

  @Post()
  @ApiOperation({ summary: ' Create User ' })
  create(@Body() userDTO: UserDTO): Promise<IUser> {
    return this._userSvc.create(userDTO);
  }

  @Get()
  @ApiOperation({ summary: ' Find All Users ' })
  findAll() {
    return this._userSvc.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: ' Find User ' })
  findOne(@Param('id') id: IUser): Promise<IUser> {
    return this._userSvc.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: ' Update User ' })
  update(@Param('id') id: string, @Body() userDTO: UserDTO): Promise<IUser> {
    return this._userSvc.update(id, userDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: ' Delete User ' })
  delete(@Param('id') id: IUser) {
    return this._userSvc.delete(id);
  }

  @Post('createEstablishment/:userId')
  @ApiOperation({ summary: 'Create a Establishment' })
  async createEstablishment(
    @Param('userId') userId: IUser,
    @Body() establishmentDTO: EstablishmentDTO,
  ): Promise<IUser> {
    const user = await this._userSvc.findOne(userId);

    if (!user.subscription) {
      throw new HttpException(
        'You do not have a subscription',
        HttpStatus.NOT_FOUND,
      );
    }
    if (!user.subscription[0].virtualEstablishmen) {
      throw new HttpException(
        'No Permits To Register Your Establishment',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    return this._userSvc.createEstablishment(userId, establishmentDTO);
  }

  @Post('createAppointment')
  @ApiOperation({ summary: 'Create a Appointment' })
  async createAppointment(
    @Body() appointmentDTO: AppointmentDTO,
  ): Promise<IUser> {
    return this._userSvc.createAppointment(appointmentDTO);
  }

  @Post('createPurchase')
  @ApiOperation({ summary: 'Create a Purchase' })
  async createPurchase(@Body() purchaseDTO: PurchaseDTO): Promise<IUser> {
    return this._userSvc.createPurchase(purchaseDTO);
  }

  @Post(':userId/establishment/:establishmentId')
  async addEstablishment(
    @Param('userId') userId: string,
    @Param('establishmentId') establishmentId: IEstablishment,
  ) {
    const establishment = await this._establishmentSvc.findOne(establishmentId);

    if (!establishment) {
      throw new HttpException('Establishment Not Found', HttpStatus.NOT_FOUND);
    }

    return this._userSvc.addEstablishment(userId, establishmentId);
  }

  @Post(':userId/subscription/:subscriptionId')
  async addSubscription(
    @Param('userId') userId: string,
    @Param('subscriptionId') subscriptionId: ISubscription,
  ) {
    const subscription = await this._subscriptionSvc.findOne(subscriptionId);

    if (!subscription) {
      throw new HttpException('Subscription Not Found', HttpStatus.NOT_FOUND);
    }

    return this._userSvc.addSubscription(userId, subscriptionId);
  }
}
