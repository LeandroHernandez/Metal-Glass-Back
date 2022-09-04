import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentModule } from 'src/appointment/appointment.module';
import { CEDE } from 'src/common/models/models';
import { PhotoModule } from 'src/photo/photo.module';
import { CedeController } from './cede.controller';
import { CedeService } from './cede.service';
import { CedeSchema } from './schema/cede.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: CEDE.name,
        useFactory: () => {
          return CedeSchema;
        },
      },
    ]),
    AppointmentModule,
    PhotoModule,
  ],
  controllers: [CedeController],
  providers: [CedeService],
  exports: [CedeService],
})
export class CedeModule {}
