import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TYPE_DOCUMENT } from 'src/common/models/models';
import { TypeDocumentSchema } from './schema/type.document.schema';
import { TypeDocumentController } from './type-document.controller';
import { TypeDocumentService } from './type-document.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: TYPE_DOCUMENT.name,
        useFactory: () => {
          return TypeDocumentSchema;
        },
      },
    ]),
  ],
  controllers: [TypeDocumentController],
  providers: [TypeDocumentService],
})
export class TypeDocumentModule {}
