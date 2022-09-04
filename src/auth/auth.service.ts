import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  public ejemplo = 'ejemplo';
  constructor(
    private readonly _userSvc: UserService,
    private readonly _jwtSvc: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    // async validateUser (email: string, password: string): Promise<any> {

    const user = await this._userSvc.findByUsername(username);
    // const user = await this._userSvc.findByEamil(email);
    const isValidPassword = await this._userSvc.checkPassword(
      password,
      user.password,
    );

    if (user && isValidPassword) return user;
    return null;
  }

  async signIn(user: any) {
    const payload = {
      username: user.username,
      // email: user.email,
      sub: user._id,
      // sub: user.id,
    };

    return {
      access_token: this._jwtSvc.sign(payload),
      userId: user.id,
      user: user,
    };
    // return payload
  }

  async signUp(userDTO: UserDTO) {
    return this._userSvc.create(userDTO);
  }

  async validateToken(token: string): Promise<boolean> {
    let condition = true;
    const token_decode = await this._jwtSvc.decode(token);
    // console.log({ token_decode });
    if (!token_decode || token_decode === undefined || token_decode === null) {
      condition = false;
    }
    return condition;
  }
}
