import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IAditionalReference } from 'src/common/interfaces/aditional-reference.interface';
import { AditionalReferenceDTO } from './dto/aditional-reference.dto';
import { AditionalReferenceService } from './aditional-reference.service';

@ApiTags('aditional-reference')
@Controller('api/v1/aditional-reference')
export class AditionalReferenceController {
  constructor(
    private readonly _aditionalReferenceSvc: AditionalReferenceService,
  ) {}

  @Post()
  @ApiOperation({ summary: ' Create Aditional Reference ' })
  create(
    @Body() aditionalReferenceDTO: AditionalReferenceDTO,
  ): Promise<IAditionalReference> {
    return this._aditionalReferenceSvc.create(aditionalReferenceDTO);
  }

  @Get()
  @ApiOperation({ summary: ' Find All Aditional References ' })
  findAll() {
    return this._aditionalReferenceSvc.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: ' Find Aditional Reference ' })
  findOne(@Param('id') id: IAditionalReference): Promise<IAditionalReference> {
    return this._aditionalReferenceSvc.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: ' Update Aditional Reference ' })
  update(
    @Param('id') id: string,
    @Body() aditionalReferenceDTO: AditionalReferenceDTO,
  ): Promise<IAditionalReference> {
    return this._aditionalReferenceSvc.update(id, aditionalReferenceDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: ' Delete Aditional Reference ' })
  delete(@Param('id') id: string) {
    return this._aditionalReferenceSvc.delete(id);
  }
}
