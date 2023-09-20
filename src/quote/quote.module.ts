import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModule } from 'src/client/client.module';
import { ClientService } from 'src/client/client.service';
import { QUOTE } from 'src/common/models/models';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';
import { QuoteSchema } from './schema/quote.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: QUOTE.name,
        useFactory: () => {
          return QuoteSchema;
        },
      },
    ]),
    ClientModule,
  ],
  controllers: [QuoteController],
  providers: [QuoteService],
})
export class QuoteModule {}
