import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessoryModule } from 'src/accessory/accessory.module';
import { AcrylicModule } from 'src/acrylic/acrylic.module';
import { WINDOW } from 'src/common/models/models';
import { GlassModule } from 'src/glass/glass.module';
import { ProfileModule } from 'src/profile/profile.module';
import { WindowSchema } from './schema/window.schema';
import { WindowController } from './window.controller';
import { WindowService } from './window.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: WINDOW.name,
        useFactory: () => {
          return WindowSchema;
        },
      },
    ]),
    AccessoryModule,
    ProfileModule,
    GlassModule,
    AcrylicModule,
  ],
  controllers: [WindowController],
  providers: [WindowService],
})
export class WindowModule {}
