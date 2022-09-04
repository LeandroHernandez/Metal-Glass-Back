/* eslint-disable prettier/prettier */
// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   HttpException,
//   HttpStatus,
//   Param,
//   Post,
//   Put,
//   UploadedFiles,
//   UseInterceptors,
// } from '@nestjs/common';
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
// import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryService } from 'src/category/category.service';
import { CedeDTO } from 'src/cede/dto/cede.dto';
import { ICategory } from 'src/common/interfaces/category.interface';
import { IEstablishment } from 'src/common/interfaces/establishment.interface';
import { EmployeeDTO } from 'src/employee/dto/employee.dto';
import { ProductDTO } from 'src/product/dto/product.dto';
import { ServiceDTO } from 'src/service/dto/service.dto';
import { EstablishmentDTO } from './dto/establishment.dto';
import { ProductsIdsDTO } from './dto/productsIds.dto';
import { ServicesIdsDTO } from './dto/servicesIds.dto';
import { EstablishmentService } from './establishment.service';

@ApiTags('establishment')
@Controller('api/v1/establishment')
export class EstablishmentController {
  constructor(
    private readonly _establishmentSvc: EstablishmentService,
    private readonly _categorySvc: CategoryService,
  ) {}

  @Post()
  @ApiOperation({ summary: ' Create Establishment ' })
  create(@Body() userDTO: EstablishmentDTO): Promise<IEstablishment> {
    return this._establishmentSvc.create(userDTO);
  }

  @Get()
  @ApiOperation({ summary: ' Find All Establishments ' })
  findAll() {
    return this._establishmentSvc.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: ' Find Establishment ' })
  findOne(@Param('id') id: string): Promise<IEstablishment> {
    return this._establishmentSvc.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: ' Update Establishment ' })
  update(
    @Param('id') id: string,
    @Body() establishmentDTO: EstablishmentDTO,
  ): Promise<IEstablishment> {
    return this._establishmentSvc.update(id, establishmentDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: ' Delete Establishment ' })
  delete(@Param('id') id: string) {
    return this._establishmentSvc.delete(id);
  }

  @Post(':establishmentId/categoryId/:categoryId')
  @ApiOperation({ summary: ' Add Category ' })
  async addCategory(
    @Param('establishmentId') establishmentId: string,
    @Param('categoryId') categoryId: ICategory,
  ): Promise<IEstablishment> {
    const category = await this._categorySvc.findOne(categoryId);

    if (!category) {
      throw new HttpException('Category Not Found', HttpStatus.NOT_FOUND);
    }
    return this._establishmentSvc.addCategory(establishmentId, categoryId);
  }

  @Post('createEmployee/:id')
  @ApiOperation({ summary: 'Create Employee' })
  async createEmployee(
    @Param('id') id: string,
    @Body() employeeDTO: EmployeeDTO,
  ) {
    return this._establishmentSvc.createEmployee(id, employeeDTO);
  }

  // Aquí está el createCede original
  // @Post('createCede/:id')
  // @ApiOperation({ summary: 'Create Cede' })
  // async createCede(@Param('id') id: string, @Body() cedeDTO: CedeDTO) {
  //   return this._establishmentSvc.createCede(id, cedeDTO);
  // }

  @Post('createCede/:establishmentId')
  @ApiOperation({ summary: 'Create Cede' })
  async createCede(
    @Param('establishmentId') establishmentId: string,
    @Body() cedeDTO: CedeDTO,
  ) {
    return this._establishmentSvc.createCede(establishmentId, cedeDTO);
  }

  @Post('createService/:id')
  @ApiOperation({ summary: 'Create Service' })
  async createService(@Param('id') id: string, @Body() serviceDTO: ServiceDTO) {
    return this._establishmentSvc.createService(id, serviceDTO);
  }

  @Post('createProduct/:id')
  @ApiOperation({ summary: 'Create Product' })
  async createProduct(@Param('id') id: string, @Body() productDTO: ProductDTO) {
    return this._establishmentSvc.createProduct(id, productDTO);
  }

  @Post('assignServicesToCede/cedeId/:cedeId')
  @ApiOperation({ summary: 'Assign Services To Cede' })
  async assignServicesToCede(
    @Param('cedeId') cedeId: string,
    @Body() servicesIds: ServicesIdsDTO,
  ) {
    // if (!servicesIds || servicesIds === null) {
    //   throw new HttpException('', HttpStatus.NOT_FOUND);
    // }
    return this._establishmentSvc.assignServicesToCede(servicesIds, cedeId);
  }

  @Post('assignProductsToCede/cedeId/:cedeId')
  @ApiOperation({ summary: 'Assign Products To Cede' })
  async assignProductsToCede(
    @Param('cedeId') cedeId: string,
    @Body() productsIds: ProductsIdsDTO,
  ) {
    // if (!servicesIds || servicesIds === null) {
    //   throw new HttpException('', HttpStatus.NOT_FOUND);
    // }
    return this._establishmentSvc.assignProductsToCede(productsIds, cedeId);
  }

  // @Post('addPhotosToEstablishment/:id')
  // @ApiOperation({ summary: ' Add Photos To Establishment ' })
  // @UseInterceptors(FilesInterceptor('file'))
  // addPhotosToEstablishment(
  //   @Param('id') id: string,
  //   @UploadedFiles() photos: Express.Multer.File,
  // ): Promise<IEstablishment> {
  //   return this._establishmentSvc.addPhotosToEstablishment(id, photos);
  // }
}
