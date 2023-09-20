import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PROFILE } from 'src/common/models/models';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { ProfileSchema } from './schema/profile.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: PROFILE.name,
        useFactory: () => {
          return ProfileSchema;
        },
      },
    ]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
