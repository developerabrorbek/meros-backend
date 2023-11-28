import { $Enums } from '@prisma/client';
import { UpdateOrderRequest } from '../interfaces';
import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto implements Omit<UpdateOrderRequest, 'orderId'> {
  @ApiProperty({
    enum: $Enums.OrderStatus,
  })
  @IsEnum($Enums.OrderStatus)
  status: $Enums.OrderStatus;
}
