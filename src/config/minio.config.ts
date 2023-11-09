import { registerAs } from '@nestjs/config';

declare interface MinioConfigOptions {
  accessKey: string;
  secretKey: string;
  endPoint: string;
  bucket: string;
  port: number;
}

export const minioConfigs = registerAs<MinioConfigOptions>(
  'minio',
  (): MinioConfigOptions => ({
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
    endPoint: process.env.MINIO_ENDPOINT,
    bucket: process.env.MINIO_BUCKET,
    port: process.env.MINIO_PORT ? parseInt(process.env.MINIO_PORT, 10) : 9000,
  }),
);
