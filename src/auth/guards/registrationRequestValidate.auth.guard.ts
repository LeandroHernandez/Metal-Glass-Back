import { ExecutionContext, Injectable } from '@nestjs/common';
// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class RegistrationRequestValidateAuthGuard extends AuthGuard('jwt') {
  // constructor(private readonly _jwtSvc: JwtService) {
  constructor(private readonly _authSvc: AuthService) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authozation = request.get('Authorization');
    const condition = this._authSvc.registrationRequestValidateToken(
      authozation.replace('Bearer ', ''),
    );
    return condition;
  }
}
