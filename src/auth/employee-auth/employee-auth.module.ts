import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EmployeeModule } from 'src/employee/employee.module';
import { EmployeeAuthController } from './employee-auth.controller';
import { EmployeeAuthService } from './employee-auth.service';
import { EmployeeJwtStrategy } from './strategies/employee.jwt.strategy';
import { EmployeeLocalStrategy } from './strategies/empoyee.local.strategy';

@Module({
  imports: [
    EmployeeModule,
    PassportModule,
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: {
        expiresIn: '12h',
        audience: 'https://metalGlass.com',
        //
        // expiresIn: `${process.env.EXPIRES_IN}`,
        // audience: `${process.env.APP_URL}`,
      },
    }),
  ],
  controllers: [EmployeeAuthController],
  providers: [EmployeeAuthService, EmployeeJwtStrategy, EmployeeLocalStrategy],
  exports: [EmployeeAuthService],
})
export class EmployeeAuthModule {}
