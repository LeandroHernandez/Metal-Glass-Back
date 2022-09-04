import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EMPLOYEES } from 'src/common/models/models';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { EmployeeSchema } from './schema/employee.schema';

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
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
