import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IClient } from 'src/common/interfaces/client.interface';
import { ClientService } from './client.service';
import { ClientDTO } from './dto/client.dto';

// @Controller('client')
// export class ClientController {}

@ApiTags('client')
// @ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@Controller('api/v1/client')
export class ClientController {
  constructor(private readonly _clientSvc: ClientService) {}

  @Post()
  @ApiOperation({ summary: ' Create client ' })
  create(@Body() clientDTO: ClientDTO): Promise<IClient> {
    return this._clientSvc.create(clientDTO);
  }

  @Get()
  @ApiOperation({ summary: ' Find All clients ' })
  findAll() {
    return this._clientSvc.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: ' Find client ' })
  //   findOne(@Param('id') id: string): Promise<IClient> {
  findOne(@Param('id') id: IClient): Promise<IClient> {
    return this._clientSvc.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: ' Update client ' })
  //   update(@Param('id') id: string, @Body() clientDTO: clientDTO): Promise<IClient> {
  update(
    @Param('id') id: string,
    @Body() clientDTO: ClientDTO,
  ): Promise<IClient> {
    return this._clientSvc.update(id, clientDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: ' Delete client ' })
  delete(@Param('id') id: string) {
    return this._clientSvc.delete(id);
  }
}
