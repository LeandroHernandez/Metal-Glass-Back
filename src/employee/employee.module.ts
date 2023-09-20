import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssignmentModule } from 'src/assignment/assignment.module';
import { EMPLOYEES } from 'src/common/models/models';
import { PurchaseModule } from 'src/purchase/purchase.module';
import { TypeDocumentModule } from 'src/type-document/type-document.module';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { EmployeeSchema } from './schema/employee.schema';
import { PhotoModule } from 'src/photo/photo.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: EMPLOYEES.name,
        useFactory: () => {
          return EmployeeSchema;
        },
      },
    ]),
    TypeDocumentModule,
    PurchaseModule,
    AssignmentModule,
    PhotoModule,
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
