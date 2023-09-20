import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmployeeDTO } from 'src/employee/dto/employee.dto';
import { EmployeeAuthService } from './employee-auth.service';
import { IEmployee } from 'src/common/interfaces/employee.interface';

@ApiTags('Authentication')
@Controller('api/v1/employee-auth')
export class EmployeeAuthController {
  constructor(private readonly _employeeAuthSvc: EmployeeAuthService) {}

  // @UseGuards(EmployeeLocalAuthGuard)
  @Post('signIn')
  async signIn(@Req() req) {
    return await this._employeeAuthSvc.signIn(req.body);
    // return await this._authSvc.validateUser(req.email, req.password)
  }

  @Post('signUp')
  async signUp(@Body() employeeDTO: EmployeeDTO) {
    return await this._employeeAuthSvc.signUp(employeeDTO);
  }

  @Post('validatePassword')
  validatePassword(@Body() credentials: { id: IEmployee; password: string }) {
    return this._employeeAuthSvc.validatePasswordEmployee(
      credentials.id,
      credentials.password,
    );
  }
}
