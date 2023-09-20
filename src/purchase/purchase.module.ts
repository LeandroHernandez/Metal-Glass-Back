import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PURCHASES } from 'src/common/models/models';
import { ProductModule } from 'src/product/product.module';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { PurchaseSchema } from './schema/purchase.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: PURCHASES.name,
        useFactory: () => {
          return PurchaseSchema;
        },
      },
    ]),
    ProductModule,
  ],
  controllers: [PurchaseController],
  providers: [PurchaseService],
  exports: [PurchaseService],
})
export class PurchaseModule {}
