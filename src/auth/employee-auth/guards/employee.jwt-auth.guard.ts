import { ExecutionContext, Injectable } from '@nestjs/common';
// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { EmployeeAuthService } from '../employee-auth.service';

@Injectable()
export class EmployeeJwtAuthGuard extends AuthGuard('jwt') {
  // constructor(private readonly _jwtSvc: JwtService) {
  constructor(private readonly _employeeAuthSvc: EmployeeAuthService) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authozation = request.get('Authorization');
    const condition = this._employeeAuthSvc.validateToken(
      authozation.replace('Bearer ', ''),
    );
    return condition;
  }
}
