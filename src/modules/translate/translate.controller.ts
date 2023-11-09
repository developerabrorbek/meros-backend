import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
} from '@nestjs/common';
import { TranslateService } from './translate.service';
import {
  ApiBody,
  ApiHeader,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTranslateDto } from './dtos';
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

  @ApiBody({
    type: CreateTranslateDto,
    required: true,
  })
  @Post()
  async createTranslate(@Body() payload: CreateTranslateDto): Promise<void> {
    await this.#_service.createTranslate(payload);
  }

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

  @ApiParam({
    name: 'id',
    required: true,
  })
  @Delete(':id')
  async deleteTranslate(@Param('id') translateId: string): Promise<void> {
    await this.#_service.deleteTranslate(translateId);
  }
}
