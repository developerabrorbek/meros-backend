import { IsLatitude, IsLongitude, IsString, IsUUID } from 'class-validator';
import { CreateOrderRequest } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto implements CreateOrderRequest {
  @ApiProperty({
    example: "Toshkent shahri Amir Temur shox ko'chasi 1a uy",
  })
  @IsString()
  destination: string;

  @ApiProperty({
    example: '37.635118',
  })
  @IsLatitude()
  latitude?: string;

  @ApiProperty({
    example: '7.523435',
  })
  @IsLongitude()
  longitude?: string;

  @ApiProperty({
    example: '6c389fce-eb0e-4ae7-876b-6f5cedb6949f',
  })
  @IsString()
  @IsUUID(4)
  productId: string;

  @ApiProperty({
    example: '6c389fce-eb0e-4ae7-876b-6f5cedb6949f',
  })
  @IsString()
  @IsUUID(4)
  userId: string;
}
