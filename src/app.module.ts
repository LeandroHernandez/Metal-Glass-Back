import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { EstablishmentModule } from './establishment/establishment.module';
import { CategoryModule } from './category/category.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { AppointmentModule } from './appointment/appointment.module';
import { PurchaseModule } from './purchase/purchase.module';
import { CedeModule } from './cede/cede.module';
import { EmployeeModule } from './employee/employee.module';
import { ServiceModule } from './service/service.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { PurchaseStatusModule } from './purchase-status/purchase-status.module';
import { AppointmentStatusModule } from './appointment-status/appointment-status.module';
import { TypeDocumentModule } from './type-document/type-document.module';
import { PhotoModule } from './photo/photo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.URI_MONGODB, {
      // useCreateIndex: true,
      // useFindAndModify: false,
    }),
    UserModule,
    EstablishmentModule,
    CategoryModule,
    SubscriptionModule,
    AppointmentModule,
    PurchaseModule,
    CedeModule,
    EmployeeModule,
    ServiceModule,
    ProductModule,
    AuthModule,
    PurchaseStatusModule,
    AppointmentStatusModule,
    TypeDocumentModule,
    PhotoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
