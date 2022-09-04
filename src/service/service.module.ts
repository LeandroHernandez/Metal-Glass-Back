import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SERVICE } from 'src/common/models/models';
import { ServiceSchema } from './schema/service.schema';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: SERVICE.name,
        useFactory: () => {
          return ServiceSchema;
        },
      },
    ]),
  ],
  controllers: [ServiceController],
  providers: [ServiceService],
  exports: [ServiceService],
})
export class ServiceModule {}
