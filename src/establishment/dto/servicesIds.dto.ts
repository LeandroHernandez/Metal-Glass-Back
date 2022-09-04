import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { IService } from 'src/common/interfaces/service.interface';

export class ServicesIdsDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  servicesIds: IService[];
}
