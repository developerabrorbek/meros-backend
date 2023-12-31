import { Language } from '@prisma/client';
import { LanguageService } from './language.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, SetMetadata } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateLanguageDto, UpdateLanguageDto } from './dtos';

@ApiTags('Language')
@Controller({
  path: 'language',
  version: '1.0',
})
export class LanguageController {
  #_service: LanguageService;

  constructor(service: LanguageService) {
    this.#_service = service;
  }

  @SetMetadata("roles", "all")
  @Get()
  async getLanguageList(): Promise<Language[]> {
    return await this.#_service.getLanguageList();
  }

  @ApiBody({
    description: 'Create language description',
    type: CreateLanguageDto,
  })
  @SetMetadata("roles", ["admin", "super_admin"])
  @Post()
  async createLanguage(@Body() payload: CreateLanguageDto): Promise<void> {
    await this.#_service.createLanguage(payload);
  }

  @SetMetadata("roles", ["admin", "super_admin"])
  @Patch(':id')
  async updateLanguage(
    @Body() payload: UpdateLanguageDto,
    @Param('id') id: string,
  ): Promise<void> {
    await this.#_service.updateLanguage({ id, ...payload });
  }

  @SetMetadata("roles", ["admin", "super_admin"])
  @Delete(':id')
  async deleteLanguage(@Param("id") id: string): Promise<void>{
    await this.#_service.deleteLanguage(id)
  }
}
