import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig, minioConfigs } from './config';
import { PrismaModule } from 'prisma/prisma.module';
import { CategoryModule, LanguageModule, ProductModule, TranslateModule } from 'modules';
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
    CategoryModule,
    ProductModule,
  ],
})
export class AppModule {}
