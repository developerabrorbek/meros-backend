import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  SetMetadata,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Order } from '@prisma/client';
import { CreateOrderDto, UpdateOrderDto } from './dtos';

@ApiTags('Orders')
@Controller('order')
export class OrderController {
  #_service: OrderService;

  constructor(service: OrderService) {
    this.#_service = service;
  }

  @SetMetadata("roles", ["admin", "super_admin"])
  @Get('/all')
  async getOrderList(): Promise<Order[]> {
    return await this.#_service.getOrderList();
  }

  @ApiParam({
    name: "id",
    example: "6c389fce-eb0e-4ae7-876b-6f5cedb6949f"
  })
  @SetMetadata("roles", "all")
  @Get(':id')
  async getSingleOrder(@Param('id') id: string): Promise<Order> {
    return await this.#_service.getSingleOrder(id);
  }

  @ApiParam({
    name: "userId",
    example: "6c389fce-eb0e-4ae7-876b-6f5cedb6949f"
  })
  @SetMetadata("roles", "all")
  @Get('/user/:userId')
  async getUserOrders(@Param('userId') userId: string): Promise<Order[]> {
    return await this.#_service.getOrderByUserId(userId);
  }

  @ApiBody({
    type: CreateOrderDto
  })
  @SetMetadata("roles", "all")
  @Post()
  async createOrder(@Body() payload: CreateOrderDto): Promise<void> {
    await this.#_service.createOrder(payload);
  }

  @ApiBody({
    type: UpdateOrderDto
  })
  @ApiParam({
    name: "id",
    example: "6c389fce-eb0e-4ae7-876b-6f5cedb6949f"
  })
  @SetMetadata("roles", "all")
  @Patch(':id')
  async updateOrder(
    @Body() payload: UpdateOrderDto,
    @Param('id') id: string,
  ): Promise<void> {
    await this.#_service.updateOrder({ ...payload, orderId: id });
  }

  @ApiParam({
    name: "id",
    example: "6c389fce-eb0e-4ae7-876b-6f5cedb6949f",
    description: "Order id"
  })
  @SetMetadata("roles", "all")
  @Delete(':id')
  async deleteOrder(@Param('id') id: string): Promise<void> {
    await this.#_service.deleteOrder(id);
  }
}
