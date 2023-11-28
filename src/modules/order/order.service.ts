import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Order, OrderStatus } from '@prisma/client';
import { isUUID } from 'class-validator';
import { PrismaService } from 'prisma/prisma.service';
import { CreateOrderRequest, UpdateOrderRequest } from './interfaces';

@Injectable()
export class OrderService {
  #_prisma: PrismaService;

  constructor(prisma: PrismaService) {
    this.#_prisma = prisma;
  }

  async getOrderList(): Promise<Order[]> {
    return await this.#_prisma.order.findMany();
  }

  async getSingleOrder(id: string): Promise<Order> {
    this.#_checkUUID(id);
    return await this.#_prisma.order.findFirst({ where: { id } });
  }

  async getOrderByUserId(userId: string): Promise<Order[]> {
    this.#_checkUUID(userId);
    return await this.#_prisma.order.findMany({ where: { userId } });
  }

  async createOrder(payload: CreateOrderRequest): Promise<void> {
    await this.#_prisma.order.create({
      data: {
        destination: payload.destination,
        status: OrderStatus.ordered,
        latitude: payload.latitude,
        longitude: payload.longitude,
        productId: payload.productId,
        userId: payload.userId,
      },
    });
  }

  async updateOrder(payload: UpdateOrderRequest): Promise<void> {
    this.#_checkUUID(payload.orderId)
    await this.#_prisma.order.update({
      data: {
        status: payload.status,
      },
      where: {
        id: payload.orderId,
      },
    });
  }

  async deleteOrder(orderId: string): Promise<void> {
    this.#_checkUUID(orderId);
    await this.#_prisma.order.delete({
      where: {
        id: orderId,
      },
    });
  }

  #_checkUUID(id: string): void {
    if (!isUUID(id, 4)) {
      throw new UnprocessableEntityException(
        `Given ${id} id is not valid UUID`,
      );
    }
  }
}
