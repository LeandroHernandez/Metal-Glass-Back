import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CATEGORY } from 'src/common/models/models';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategorySchema } from './schema/category.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: CATEGORY.name,
        useFactory: () => {
          return CategorySchema;
        },
      },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
