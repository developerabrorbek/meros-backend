import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './config';
import { PrismaModule } from 'prisma/prisma.module';
import { LanguageModule, TranslateModule } from 'modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    PrismaModule,
    LanguageModule,
    TranslateModule,
  ],
})
export class AppModule {}
