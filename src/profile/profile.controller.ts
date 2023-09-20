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
import { IProfile } from 'src/common/interfaces/profile.interface';
import { ProfileDTO } from './dto/profile.dto';
import { ProfileService } from './profile.service';

@ApiTags('profile')
@Controller('api/v1/profile')
export class ProfileController {
  constructor(private readonly _profileSvc: ProfileService) {}

  @Post()
  @ApiOperation({ summary: ' Create Profile ' })
  create(@Body() profileDTO: ProfileDTO): Promise<IProfile> {
    return this._profileSvc.create(profileDTO);
  }

  @Get()
  @ApiOperation({ summary: ' Find All Profiles ' })
  findAll() {
    return this._profileSvc.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: ' Find Profile ' })
  findOne(@Param('id') id: IProfile): Promise<IProfile> {
    return this._profileSvc.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: ' Update Profile ' })
  update(
    @Param('id') id: string,
    @Body() profileDTO: ProfileDTO,
  ): Promise<IProfile> {
    return this._profileSvc.update(id, profileDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: ' Delete Profile ' })
  delete(@Param('id') id: string) {
    return this._profileSvc.delete(id);
  }
}
