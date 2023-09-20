import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { EmployeeAuthService } from '../employee-auth.service';

@Injectable()
export class EmployeeLocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _employeeAuthSvc: EmployeeAuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    // async validate ( email: string, password: string ): Promise<any> {
    const employee = await this._employeeAuthSvc.validateEmployee(
      username,
      password,
    );
    // const user = await this._authSvc.validateUser(email, password);

    if (!employee) throw new UnauthorizedException();

    return employee;
  }
}
