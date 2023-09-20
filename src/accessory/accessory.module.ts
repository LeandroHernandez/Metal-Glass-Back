import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ACCESSORY } from 'src/common/models/models';
import { AccessoryController } from './accessory.controller';
import { AccessoryService } from './accessory.service';
import { AccessorySchema } from './schema/accessory.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: ACCESSORY.name,
        useFactory: () => {
          return AccessorySchema;
        },
      },
    ]),
  ],
  controllers: [AccessoryController],
  providers: [AccessoryService],
})
export class AccessoryModule {}
