import { PrismaService } from '@prisma';
import { CreateCategoryRequest } from './interfaces';
import { Injectable, NotFoundException } from '@nestjs/common';
import { MinioService } from 'client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CategoryService {
  #_prisma: PrismaService;
  #_minio: MinioService;
  #_config: ConfigService;

  constructor(
    prisma: PrismaService,
    minio: MinioService,
    config: ConfigService,
  ) {
    this.#_prisma = prisma;
    this.#_minio = minio;
    this.#_config = config;
  }

  async createCategory(payload: CreateCategoryRequest): Promise<void> {
    const file = await this.#_minio.uploadImage({
      bucket: this.#_config.getOrThrow<string>('minio.bucket'),
      file: payload.file,
    });
    if (!file.image) throw new NotFoundException('Image not found');

    await this.#_prisma.category.create({
      data: {
        image: file.image,
        name: payload.name,
        parentId: payload.parentId,
      },
    });
  }
}
