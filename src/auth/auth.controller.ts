import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IUser } from 'src/common/interfaces/user.interface';
import { UserDTO } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
// import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegistrationRequestValidateAuthGuard } from './guards/registrationRequestValidate.auth.guard';
import { signInDTO } from './dto/employee.dto';

@ApiTags('Authentication')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly _authSvc: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  @Post('signIn')
  // async signIn(@Req() req) {
  async signIn(@Body() req: signInDTO) {
    // return await this._authSvc.signIn(req.user);
    return await this._authSvc.signIn(req);
    // return await this._authSvc.validateUser(req.email, req.password)
  }

  @Post('registrationRequest')
  registrationRequest(
    @Body() credentials: { password1: string; password2: string },
  ) {
    return this._authSvc.registrationRequestValidate(credentials);
  }

  @Post('validatePassword')
  validatePassword(@Body() credentials: { id: IUser; password: string }) {
    return this._authSvc.validatePasswordUser(
      credentials.id,
      credentials.password,
    );
  }

  @ApiBearerAuth()
  @UseGuards(RegistrationRequestValidateAuthGuard)
  @Post('signUp')
  async signUp(@Body() userDTO: UserDTO) {
    return await this._authSvc.signUp(userDTO);
  }

  @Post('validateDocument')
  @ApiOperation({ summary: ' Validate Personal Data ' })
  async validateDocument(
    @Body()
    validateDTO: {
      typeDocument: string | any;
      documentNumber: string | any;
    },
  ): Promise<boolean> {
    return await this._authSvc.validateDocument(validateDTO);
  }

  // @Post('generatePassword')
  // @ApiOperation({ summary: ' generate password ' })
  // async generatePassword(@Body() generateDTO: { id: string }): Promise<string> {
  //   return await this._userSvc.generatePassword(generateDTO.id);
  // }
}
