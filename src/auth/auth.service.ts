import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpStatus } from '@nestjs/common/enums';
import { IUser } from 'src/common/interfaces/user.interface';
import { UserDTO } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { signInDTO } from './dto/employee.dto';

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

  async validatePasswordUser(id: IUser, password: string): Promise<any> {
    // async validateUser (email: string, password: string): Promise<any> {

    const user = await this._userSvc.findOne(id);
    // const user = await this._userSvc.findByEamil(email);
    const isValidPassword = await this._userSvc.checkPassword(
      password,
      user.password,
    );

    if (user && isValidPassword) return user;
    return null;
  }

  // async signIn(user: any) {
  async signIn(signInDTO: signInDTO) {
    // Change
    const user = await this.validateUser(
      signInDTO.username,
      signInDTO.password,
    );
    // const user = await this._authSvc.validateUser(email, password);

    if (!user) throw new UnauthorizedException();

    // return user;
    // Change
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
    if (!token_decode || token_decode === undefined || token_decode === null) {
      condition = false;
    }
    return condition;
  }

  async registrationRequestValidateToken(token: string): Promise<boolean> {
    let condition = false;
    const token_decode = this._jwtSvc.decode(JSON.parse(token));
    const token_deocdeValues = Object.values(token_decode);
    if (!token_decode || token_decode === undefined || token_decode === null) {
      condition = false;
    }
    if (
      token_deocdeValues[0] ===
      'Autorizado para registrar usuario administrador'
    ) {
      condition = true;
    }
    return condition;
  }

  registrationRequestValidate(credentials: {
    password1: string;
    password2: string;
  }): any {
    let response = 'Unauthorized';
    if (credentials.password1 === '1' && credentials.password2 === '123') {
      response = this._jwtSvc.sign({
        access_token: 'Autorizado para registrar usuario administrador',
      });
    }
    return { response: response };
  }

  // async validateDocument(validateDTO): Promise<boolean> {
  //   return await this._userSvc.validateDocument(validateDTO);
  async validateDocument(validateDTO): Promise<any> {
    const validateUser = await this._userSvc.validateDocument(validateDTO);
    validateUser
      ? await this._userSvc.generatePassword(
          validateUser._id,
          validateUser.email,
        )
      : false;
    return validateUser
      ? { status: HttpStatus.OK, msg: 'New Password Ready' }
      : false;
  }
}
