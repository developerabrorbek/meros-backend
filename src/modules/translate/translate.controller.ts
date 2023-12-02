import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  SetMetadata,
} from '@nestjs/common';
import { TranslateService } from './translate.service';
import {
  ApiBody,
  ApiHeader,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTranslateDto, UpdateTranslateDto } from './dtos';
import { Translate } from '@prisma/client';
import { GetSingleTranslateResponse } from './interfaces';

@ApiTags('Translate')
@Controller({
  path: 'translate',
  version: '1.0',
})
export class TranslateController {
  #_service: TranslateService;

  constructor(service: TranslateService) {
    this.#_service = service;
  }

  @SetMetadata("roles", ["admin", "super_admin"])
  @Get()
  async getTranslateList(): Promise<Translate[]> {
    return await this.#_service.getTranslateList();
  }

  @ApiHeader({
    name: 'accept-language',
    example: 'uz',
    required: true,
  })
  @ApiParam({
    name: 'id',
    required: true,
  })
  @SetMetadata("roles", "all")
  @Get(':id')
  async retrieveSingleTranslate(
    @Headers('accept-language') languageCode: string,
    @Param('id') translateId: string,
  ): Promise<GetSingleTranslateResponse> {
    return await this.#_service.getSingleTranslate({
      languageCode,
      translateId,
    });
  }
  
  @ApiBody({
    type: CreateTranslateDto,
    required: true,
  })
  @SetMetadata("roles", ["admin", "super_admin"])
  @Post()
  async createTranslate(@Body() payload: CreateTranslateDto): Promise<void> {
    await this.#_service.createTranslate(payload);
  }

  @ApiParam({
    name: 'id',
    required: true,
  })
  @ApiBody({
    type: UpdateTranslateDto,
    required: true,
  })
  @SetMetadata("roles", ["admin", "super_admin"])
  @Patch(':id')
  async updateTranslate(@Param('id') translateId: string, @Body() payload: UpdateTranslateDto): Promise<void> {
    await this.#_service.updateTranslate({...payload, id: translateId});
  }


  @ApiParam({
    name: 'id',
    required: true,
  })
  @SetMetadata("roles", ["admin", "super_admin"])
  @Delete(':id')
  async deleteTranslate(@Param('id') translateId: string): Promise<void> {
    await this.#_service.deleteTranslate(translateId);
  }
}
