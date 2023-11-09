import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig, minioConfigs } from './config';
import { PrismaModule } from 'prisma/prisma.module';
import { LanguageModule, TranslateModule } from 'modules';
import { MinioModule } from 'client';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, minioConfigs],
    }),
    MinioModule,
    PrismaModule,
    LanguageModule,
    TranslateModule,
  ],
})
export class AppModule {}
