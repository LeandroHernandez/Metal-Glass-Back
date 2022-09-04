import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APPOINTMENT_STATUS } from 'src/common/models/models';
import { PurchaseStatusSchema } from 'src/purchase-status/schema/purchase-status.schema';
import { AppointmentStatusController } from './appointment-status.controller';
import { AppointmentStatusService } from './appointment-status.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: APPOINTMENT_STATUS.name,
        useFactory: () => {
          return PurchaseStatusSchema;
        },
      },
    ]),
  ],
  controllers: [AppointmentStatusController],
  providers: [AppointmentStatusService],
})
export class AppointmentStatusModule {}
