import { Module } from '@nestjs/common';
import { BannerController } from './banner.controller';
import { BannerService } from './banner.service';
import { PrismaService } from 'prisma/prisma.service';
import { MinioService } from 'client';

@Module({
  controllers: [BannerController],
  providers: [MinioService, PrismaService, BannerService],
})
export class BannerModule {}
