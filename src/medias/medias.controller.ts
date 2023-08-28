import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { MediaService } from './medias.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import * as httpStatus from 'http-status';

@Controller('medias')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  @HttpCode(httpStatus.CREATED)
  create(@Body() createMediaDto: CreateMediaDto) {
    return this.mediaService.create(createMediaDto);
  }

  @Get()
  findAll() {
    return this.mediaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.mediaService.findOne(+id);
  }

  @Put(':id')
  @HttpCode(httpStatus.NO_CONTENT)
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateMediaDto: UpdateMediaDto,
  ) {
    return this.mediaService.update(+id, updateMediaDto);
  }

  @Delete(':id')
  @HttpCode(httpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.mediaService.remove(+id);
  }
}