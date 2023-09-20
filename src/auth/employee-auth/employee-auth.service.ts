import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IEmployee } from 'src/common/interfaces/employee.interface';
import { EmployeeDTO } from 'src/employee/dto/employee.dto';
import { EmployeeService } from 'src/employee/employee.service';

@Injectable()
export class EmployeeAuthService {
  public ejemplo = 'ejemplo';
  constructor(
    private readonly _employeeSvc: EmployeeService,
    private readonly _jwtSvc: JwtService,
  ) {}

  async validateEmployee(username: string, password: string): Promise<any> {
    // async validateEmployee (email: string, password: string): Promise<any> {

    const employee = await this._employeeSvc.findByUsername(username);
    // const user = await this._userSvc.findByEamil(email);
    const isValidPassword = await this._employeeSvc.checkPassword(
      password,
      employee.password,
    );

    if (employee && isValidPassword) return employee;
    return null;
  }

  async signIn(employee: any) {
    const payload = {
      username: employee.username,
      // email: user.email,
      sub: employee._id,
      // sub: user.id,
    };

    const validateEmployee = await this.validateEmployee(
      employee.username,
      employee.password,
    );
    return {
      access_token: this._jwtSvc.sign(payload),
      employeeId: validateEmployee.id,
      employee: validateEmployee,
    };
    // return payload
  }

  async signUp(employeeDTO: EmployeeDTO) {
    return this._employeeSvc.create(employeeDTO);
  }

  async validateToken(token: string): Promise<boolean> {
    let condition = true;
    const token_decode = await this._jwtSvc.decode(token);
    if (!token_decode || token_decode === undefined || token_decode === null) {
      condition = false;
    }
    return condition;
  }

  async validatePasswordEmployee(
    id: IEmployee,
    password: string,
  ): Promise<any> {
    const employee = await this._employeeSvc.findOne(id);
    const isValidPassword = await this._employeeSvc.checkPassword(
      password,
      employee.password,
    );

    if (employee && isValidPassword) return employee;
    return null;
  }
}
