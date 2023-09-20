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
import { IQuote } from 'src/common/interfaces/quote.interface';
import { QuoteDTO } from './dto/quote.dto';
import { QuoteService } from './quote.service';
import { QuoteFilterDTO } from './dto/quote-filter.dto';

@ApiTags('quote')
@Controller('api/v1/quote')
export class QuoteController {
  constructor(private readonly _quoteSvc: QuoteService) {}

  @Post()
  @ApiOperation({ summary: ' Create Quote ' })
  // create(@Body() quoteDTO: QuoteDTO): Promise<IQuote> {
  create(@Body() quoteDTO: QuoteDTO) {
    return this._quoteSvc.create(quoteDTO);
  }

  @Get()
  @ApiOperation({ summary: ' Find All Quotes ' })
  findAll() {
    return this._quoteSvc.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: ' Find Quote ' })
  findOne(@Param('id') id: IQuote): Promise<IQuote> {
    return this._quoteSvc.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: ' Update Quote ' })
  update(@Param('id') id: string, @Body() quoteDTO: QuoteDTO): Promise<IQuote> {
    return this._quoteSvc.update(id, quoteDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: ' Delete Quote ' })
  delete(@Param('id') id: string) {
    return this._quoteSvc.delete(id);
  }

  @Post('/filter')
  @ApiOperation({ summary: 'Filt Quotes' })
  async filtQuotes(@Body() FilterDTO: QuoteFilterDTO): Promise<Array<IQuote>> {
    return await this._quoteSvc.filtQuotes(FilterDTO);
  }
}
