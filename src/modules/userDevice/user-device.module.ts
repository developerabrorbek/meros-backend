import { Module } from '@nestjs/common';
import { UserDeviceController } from './user-device.controller';
import { UserDeviceService } from './user-device.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [PrismaService, UserDeviceService],
  controllers: [UserDeviceController],
})
export class UserDeviceModule {}
