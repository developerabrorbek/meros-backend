import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JWTConfig, databaseConfig, minioConfigs } from './config';
import { PrismaModule } from 'prisma/prisma.module';
import {
  AuthModule,
  BannerModule,
  CategoryModule,
  LanguageModule,
  OrderModule,
  ProductModule,
  TranslateModule,
  UserDeviceModule,
  UserModule,
} from 'modules';
import { MinioModule } from 'client';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { CheckRolesGuard } from 'guards';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, minioConfigs, JWTConfig],
    }),
    JwtModule,
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
  providers: [
    {
      provide: APP_GUARD,
      useClass: CheckRolesGuard,
    },
  ],
})
export class AppModule {}
