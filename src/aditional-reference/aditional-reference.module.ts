import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ADITIONAL_REFERENCE } from 'src/common/models/models';
import { AditionalReferenceSchema } from './schema/aditional-reference.schema';
import { AditionalReferenceController } from './aditional-reference.controller';
import { AditionalReferenceService } from './aditional-reference.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: ADITIONAL_REFERENCE.name,
        useFactory: () => {
          return AditionalReferenceSchema;
        },
      },
    ]),
  ],
  controllers: [AditionalReferenceController],
  providers: [AditionalReferenceService],
})
export class AditionalReferenceModule {}
