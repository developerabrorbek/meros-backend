import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { PrismaService } from "prisma/prisma.service";
import { CategoryService } from "./category.service";
import { MinioService } from "client";

@Module({
  controllers: [CategoryController],
  providers: [MinioService,PrismaService, CategoryService]
})
export class CategoryModule {}