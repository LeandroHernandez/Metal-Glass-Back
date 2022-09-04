import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PHOTO } from 'src/common/models/models';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { PhotoSchema } from './schema/photo.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: PHOTO.name,
        useFactory: () => {
          return PhotoSchema;
        },
      },
    ]),
  ],
  controllers: [PhotoController],
  providers: [PhotoService],
  exports: [PhotoService],
})
export class PhotoModule {}
