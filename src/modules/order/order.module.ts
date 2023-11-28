import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { PrismaService } from 'prisma/prisma.service';
import { OrderService } from './order.service';

@Module({
  providers: [PrismaService, OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
