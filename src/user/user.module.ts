import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentModule } from 'src/appointment/appointment.module';
import { CedeModule } from 'src/cede/cede.module';
import { USER } from 'src/common/models/models';
import { EstablishmentModule } from 'src/establishment/establishment.module';
import { PurchaseModule } from 'src/purchase/purchase.module';
import { SubscriptionModule } from 'src/subscription/subscription.module';
import { UserSchema } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: USER.name,
        useFactory: () => {
          return UserSchema;
        },
      },
    ]),
    EstablishmentModule,
    AppointmentModule,
    PurchaseModule,
    SubscriptionModule,
    CedeModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
