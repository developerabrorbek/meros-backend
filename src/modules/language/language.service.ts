import { PrismaService } from '@prisma';
import { CreateLanguageRequest, UpdateLanguageRequest } from './interfaces';
import { ConflictException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Language } from '@prisma/client';
import { isUUID } from 'class-validator';

@Injectable()
export class LanguageService {
  #_prisma: PrismaService;

  constructor(prisma: PrismaService) {
    this.#_prisma = prisma;
  }

  async createLanguage(payload: CreateLanguageRequest): Promise<void> {
    await this.#_checkExistingLanguage(payload.code);

    await this.#_prisma.language.create({
      data: {
        code: payload.code,
        title: payload.title,
      },
    });
  }

  async getLanguageList(): Promise<Language[]> {
    return await this.#_prisma.language.findMany();
  }

  async updateLanguage(payload: UpdateLanguageRequest): Promise<void> {
    await this.#_checkLanguage(payload.id);

    await this.#_prisma.language.update({
      data: { title: payload.title },
      where: { id: payload.id },
    });
  }

  async deleteLanguage(id: string): Promise<void> {
    await this.#_checkLanguage(id);

    await this.#_prisma.language.delete({ where: { id } });
  }

  async #_checkExistingLanguage(code: string): Promise<void> {
    const language = await this.#_prisma.language.findFirst({
      where: {
        code,
      },
    });

    if (language) {
      throw new ConflictException(`${language.title} is already available`);
    }
  }

  async #_checkLanguage(id: string): Promise<void> {
    await this.#_checkId(id)
    const language = await this.#_prisma.language.findFirst({
      where: {
        id,
      },
    });

    if (!language) {
      throw new ConflictException(`Language with ${id} is not exists`);
    }
  }

  async #_checkId(id: string): Promise<void>{
    const isValid = isUUID(id, 4)
    if(!isValid){
      throw new UnprocessableEntityException(`Invalid ${id} id`)
    }
  }
}
