import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PRODUCT } from 'src/common/models/models';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductSchema } from './schema/product.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: PRODUCT.name,
        useFactory: () => {
          return ProductSchema;
        },
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
