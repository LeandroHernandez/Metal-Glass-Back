import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PURCHASES_STATUS } from 'src/common/models/models';
import { PurchaseStatusController } from './purchase-status.controller';
import { PurchaseStatusService } from './purchase-status.service';
import { PurchaseStatusSchema } from './schema/purchase-status.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: PURCHASES_STATUS.name,
        useFactory: () => {
          return PurchaseStatusSchema;
        },
      },
    ]),
  ],
  controllers: [PurchaseStatusController],
  providers: [PurchaseStatusService],
  exports: [PurchaseStatusService],
})
export class PurchaseStatusModule {}
