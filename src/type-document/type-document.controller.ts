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
import { ITypeDocument } from 'src/common/interfaces/type-document.interface';
import { TypeDocumentDTO } from './dto/type-document.dto';
import { TypeDocumentService } from './type-document.service';

@ApiTags('type-document')
@Controller('api/v1/type-document')
export class TypeDocumentController {
  constructor(private readonly _type_documentSvc: TypeDocumentService) {}

  @Post()
  @ApiOperation({ summary: ' Create Types Documents ' })
  create(@Body() type_documentDTO: TypeDocumentDTO): Promise<ITypeDocument> {
    return this._type_documentSvc.create(type_documentDTO);
  }

  @Get()
  @ApiOperation({ summary: ' Find All Types Documents ' })
  findAll(): Promise<ITypeDocument[]> {
    return this._type_documentSvc.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: ' Find One Types Documents ' })
  findOne(@Param('id') id: string): Promise<ITypeDocument> {
    return this._type_documentSvc.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: ' Update Types Documents ' })
  update(
    @Param('id') id: string,
    @Body() type_documentDTO: TypeDocumentDTO,
  ): Promise<ITypeDocument> {
    return this._type_documentSvc.update(id, type_documentDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: ' Delete Types Documents ' })
  delete(@Param('id') id: string) {
    return this._type_documentSvc.delete(id);
  }
}
