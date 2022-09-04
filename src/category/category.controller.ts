import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ICategory } from 'src/common/interfaces/category.interface';
import { CategoryService } from './category.service';
import { CategoryDTO } from './dto/category.dto';

@ApiTags('category')
@Controller('api/v1/category')
export class CategoryController {
  constructor(private readonly _categorySvc: CategoryService) {}

  @Post()
  @ApiOperation({ summary: ' Create Category ' })
  create(@Body() categoryDTO: CategoryDTO): Promise<ICategory> {
    return this._categorySvc.create(categoryDTO);
  }

  @Get()
  @ApiOperation({ summary: ' Find All Categorys ' })
  findAll() {
    return this._categorySvc.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: ' Find Category ' })
  findOne(@Param('id') id: ICategory): Promise<ICategory> {
    return this._categorySvc.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: ' Update Category ' })
  update(
    @Param('id') id: ICategory,
    @Body() categoryDTO: CategoryDTO,
  ): Promise<ICategory> {
    return this._categorySvc.update(id, categoryDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: ' Delete Category ' })
  delete(@Param('id') id: string) {
    return this._categorySvc.delete(id);
  }

  @Post(':fatherId/sonId/:sonId')
  async addSubCategory(
    @Param('fatherId') fatherId: ICategory,
    @Param('sonId') sonId: ICategory,
  ) {
    const father = await this._categorySvc.findOne(fatherId);
    const son = await this._categorySvc.findOne(sonId);

    if (!son) {
      throw new HttpException('Sub Category Not Found', HttpStatus.NOT_FOUND);
    }
    if (!father) {
      throw new HttpException(
        'Father Category Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
    return await this._categorySvc.addSubCategory(fatherId, sonId);
  }
}
