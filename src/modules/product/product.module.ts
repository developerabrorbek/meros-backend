import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { PrismaService } from "prisma/prisma.service";
import { ProductService } from "./product.service";
import { MinioService } from "client";
import { TranslateService } from "modules/translate";

@Module({
  controllers: [ProductController],
  providers: [PrismaService, MinioService, TranslateService, ProductService]
})
export class ProductModule {}