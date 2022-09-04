import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDTO } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Authentication')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly _authSvc: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signIn')
  async signIn(@Req() req) {
    return await this._authSvc.signIn(req.user);
    // return await this._authSvc.validateUser(req.email, req.password)
  }

  @Post('signUp')
  async signUp(@Body() userDTO: UserDTO) {
    return await this._authSvc.signUp(userDTO);
  }
}
