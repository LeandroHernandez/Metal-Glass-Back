import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _authSvc: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    // async validate ( email: string, password: string ): Promise<any> {
    const user = await this._authSvc.validateUser(username, password);
    // const user = await this._authSvc.validateUser(email, password);

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
