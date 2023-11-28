import { OrderStatus } from "@prisma/client";

export declare interface UpdateOrderRequest {
  orderId: string;
  status: OrderStatus,

}