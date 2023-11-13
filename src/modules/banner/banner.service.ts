import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Banner, BannerPriority } from '@prisma/client';
import { MinioService } from 'client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateBannerRequest, UpdateBannerRequest } from './interfaces';
import { ConfigService } from '@nestjs/config';
import { isEnum, isUUID } from 'class-validator';

@Injectable()
export class BannerService {
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

  async getBannerList(): Promise<Banner[]> {
    return await this.#_prisma.banner.findMany();
  }

  async getBannerListByPriority(priority: BannerPriority): Promise<Banner[]> {
    this.#_checkPriority(priority)
    return await this.#_prisma.banner.findMany({
      where: { priority, status: 'active' },
    });
  }

  async getSingleBanner(id: string): Promise<Banner>{
    this.#_checkUUID(id)
    return await this.#_prisma.banner.findFirst({where: {id}})
  }

  async createBanner(payload: CreateBannerRequest): Promise<void> {
    try {
      const banner = await this.#_minio.uploadImage({
        bucket: this.#_config.getOrThrow<string>('minio.bucket'),
        file: payload.image,
      });

      await this.#_prisma.banner.create({
        data: {
          image: banner.image,
          priority: payload.priority,
          status: payload.status,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateBanner(payload: UpdateBannerRequest): Promise<void> {
    try {
      this.#_checkUUID(payload.id);
      let banner = null
      if(payload.image){
         banner = await this.#_minio.uploadImage({
          bucket: this.#_config.getOrThrow<string>('minio.bucket'),
          file: payload.image,
        });
      }

      await this.#_prisma.banner.update({
        where: { id: payload.id },
        data: {
          image: banner?.image,
          status: payload.status,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteBanner(id: string) {
    this.#_checkUUID(id);

    await this.#_prisma.banner.delete({ where: { id } });
  }

  #_checkUUID(id: string): void {
    if (!isUUID(id, 4)) {
      throw new ConflictException(`Given ${id} id is nnot valid UUID`);
    }
  }

  #_checkPriority(priority: string): void {
    if(!isEnum(priority, BannerPriority)){
      throw new UnprocessableEntityException(`Given ${priority} enum is not valid enum`)
    }
  }
}
