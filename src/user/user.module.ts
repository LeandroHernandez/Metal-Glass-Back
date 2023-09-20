import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssignmentModule } from 'src/assignment/assignment.module';
import { ClientModule } from 'src/client/client.module';
import { USER } from 'src/common/models/models';
import { EmployeeModule } from 'src/employee/employee.module';
import { PhotoModule } from 'src/photo/photo.module';
import { ProductModule } from 'src/product/product.module';
import { PurchaseModule } from 'src/purchase/purchase.module';
import { TypeDocumentModule } from 'src/type-document/type-document.module';
import { UserSchema } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MailService } from '@sendgrid/mail';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: USER.name,
        useFactory: () => {
          return UserSchema;
        },
      },
    ]),
    PhotoModule,
    TypeDocumentModule,
    EmployeeModule,
    ClientModule,
    ProductModule,
    PurchaseModule,
    AssignmentModule,
  ],
  controllers: [UserController],
  providers: [UserService, MailService],
  exports: [UserService],
})
export class UserModule {}
