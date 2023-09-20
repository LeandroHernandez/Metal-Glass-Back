import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CLIENT } from 'src/common/models/models';
import { TypeDocumentModule } from 'src/type-document/type-document.module';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { ClientSchema } from './schema/client.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: CLIENT.name,
        useFactory: () => {
          return ClientSchema;
        },
      },
    ]),
    TypeDocumentModule,
  ],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {}
