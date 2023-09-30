import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { AppointmentModule } from './appointment/appointment.module';
import { PurchaseModule } from './purchase/purchase.module';
import { EmployeeModule } from './employee/employee.module';
import { ServiceModule } from './service/service.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { PurchaseStatusModule } from './purchase-status/purchase-status.module';
import { AppointmentStatusModule } from './appointment-status/appointment-status.module';
import { TypeDocumentModule } from './type-document/type-document.module';
import { PhotoModule } from './photo/photo.module';
import { ClientModule } from './client/client.module';
import { EmployeeAuthModule } from './auth/employee-auth/employee-auth.module';
import { AssignmentModule } from './assignment/assignment.module';
import { AccessoryModule } from './accessory/accessory.module';
import { ProfileModule } from './profile/profile.module';
import { GlassModule } from './glass/glass.module';
import { AcrylicModule } from './acrylic/acrylic.module';
import { WindowModule } from './window/window.module';
import { AditionalReferenceModule } from './aditional-reference/aditional-reference.module';
import { QuoteModule } from './quote/quote.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from '@sendgrid/mail';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.URI_MONGODB, {}),
    // MongooseModule.forRoot('mongodb://localhost:27017/metalGlass', {}),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: 'johanhernandezvelez@gmail.com',
          pass: 'ContrasenaJLHV1*',
        },
      },
    }),
    UserModule,
    CategoryModule,
    AppointmentModule,
    PurchaseModule,
    // CedeModule,
    EmployeeModule,
    ServiceModule,
    ProductModule,
    AuthModule,
    EmployeeAuthModule,
    PurchaseStatusModule,
    AppointmentStatusModule,
    TypeDocumentModule,
    PhotoModule,
    ClientModule,
    AssignmentModule,
    AccessoryModule,
    ProfileModule,
    GlassModule,
    AcrylicModule,
    WindowModule,
    AditionalReferenceModule,
    QuoteModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}
