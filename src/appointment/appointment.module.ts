import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APPOINTMENT } from 'src/common/models/models';
import { AppointmentSchema } from './schema/appointment.schema';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: APPOINTMENT.name,
        useFactory: () => {
          return AppointmentSchema;
        },
      },
    ]),
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService],
  exports: [AppointmentService],
})
export class AppointmentModule {}
