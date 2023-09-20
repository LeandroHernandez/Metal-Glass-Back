import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ACRYLIC } from 'src/common/models/models';
import { AcrylicController } from './acrylic.controller';
import { AcrylicService } from './acrylic.service';
import { AcrylicSchema } from './schema/acrylic.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: ACRYLIC.name,
        useFactory: () => {
          return AcrylicSchema;
        },
      },
    ]),
  ],
  controllers: [AcrylicController],
  providers: [AcrylicService],
})
export class AcrylicModule {}
