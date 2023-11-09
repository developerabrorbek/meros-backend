import { Module } from "@nestjs/common";
import { MinioService } from "./minio.service";

@Module({
  exports: [MinioService],
  providers: [MinioService]
})
export class MinioModule {}