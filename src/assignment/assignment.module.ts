import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ASSIGNMENT } from 'src/common/models/models';
import { AssignmentController } from './assignment.controller';
import { AssignmentService } from './assignment.service';
import { AssignmentSchema } from './schema/assignment.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: ASSIGNMENT.name,
        useFactory: () => {
          return AssignmentSchema;
        },
      },
    ]),
  ],
  controllers: [AssignmentController],
  providers: [AssignmentService],
  exports: [AssignmentService],
})
export class AssignmentModule {}
