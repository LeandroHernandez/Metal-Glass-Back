import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GLASS } from 'src/common/models/models';
import { GlassController } from './glass.controller';
import { GlassService } from './glass.service';
import { GlassSchema } from './schema/glass.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: GLASS.name,
        useFactory: () => {
          return GlassSchema;
        },
      },
    ]),
  ],
  controllers: [GlassController],
  providers: [GlassService],
})
export class GlassModule {}
