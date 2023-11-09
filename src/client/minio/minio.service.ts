import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'minio';
import { MinioUploadRequest, MinioUploadResponse } from './interfaces';
import sharp from 'sharp';
import { randomUUID } from 'crypto';

@Injectable()
export class MinioService {
  readonly #_client: Client;
  constructor(config: ConfigService) {
    this.#_client = new Client({
      endPoint: config.getOrThrow<string>('minio.endPoint'),
      accessKey: config.getOrThrow<string>('minio.accessKey'),
      secretKey: config.getOrThrow<string>('minio.secretKey'),
      useSSL: false,
      port: config.getOrThrow<number>('minio.port'),
    });
  }

  async uploadImage(payload: MinioUploadRequest): Promise<MinioUploadResponse> {
    const file = Buffer.from(payload.file.split(';base64,')[1], 'base64');
    const { format } = await sharp(file).metadata();
    const objectName = randomUUID();
    const res = await this.#_client.putObject(
      payload.bucket,
      `/${objectName}.${format}`,
      file,
    );
    if (!res.etag)
      throw new InternalServerErrorException('Error while uploading image');
    return {
      image: `${payload.bucket}/${objectName}.${format}`,
    };
  }
}
