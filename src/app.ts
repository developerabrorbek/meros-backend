import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JWTConfig, databaseConfig, minioConfigs } from './config';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule, BannerModule, CategoryModule, LanguageModule, OrderModule, ProductModule, TranslateModule, UserDeviceModule, UserModule } from 'modules';
import { MinioModule } from 'client';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, minioConfigs, JWTConfig],
    }),
    MinioModule,
    PrismaModule,
    LanguageModule,
    TranslateModule,
    CategoryModule,
    ProductModule,
    BannerModule,
    AuthModule,
    UserModule,
    UserDeviceModule,
    OrderModule,
  ],
})
export class AppModule {}
