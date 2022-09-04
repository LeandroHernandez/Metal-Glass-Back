import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ESTABLISHMENT } from 'src/common/models/models';
import { EstablishmentSchema } from './schema/establishment.schema';
import { EstablishmentController } from './establishment.controller';
import { EstablishmentService } from './establishment.service';
import { CategoryModule } from 'src/category/category.module';
import { EmployeeModule } from 'src/employee/employee.module';
import { CedeModule } from 'src/cede/cede.module';
import { ServiceModule } from 'src/service/service.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: ESTABLISHMENT.name,
        useFactory: () => {
          return EstablishmentSchema;
        },
      },
    ]),
    CategoryModule,
    EmployeeModule,
    CedeModule,
    ServiceModule,
    ProductModule,
  ],
  controllers: [EstablishmentController],
  providers: [EstablishmentService],
  exports: [EstablishmentService],
})
export class EstablishmentModule {}
