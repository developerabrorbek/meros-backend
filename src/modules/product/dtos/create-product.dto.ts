import { IsBase64, IsInt, IsUUID, IsNumber } from 'class-validator';
import { CreateProductRequest } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto implements CreateProductRequest {
  @ApiProperty({
    example: 'c3171463-7de0-4347-a172-2b228c46d27f',
    required: true,
  })
  @IsUUID(4)
  title: string;

  @ApiProperty({
    example: ['base64image', 'base64image'],
    required: true,
  })
  @IsBase64({
    each: true,
  })
  images: string[];

  @ApiProperty({
    example: 1,
    required: true,
  })
  @IsInt()
  count: number;

  @ApiProperty({
    example: 'c3171463-7de0-4347-a172-2b228c46d27f',
    required: true,
  })
  @IsUUID(4)
  description: string;

  @ApiProperty({
    example: 10000,
    required: true,
  })
  @IsInt()
  price: number;

  @ApiProperty({
    example: 4.5,
    required: true,
  })
  @IsNumber()
  rating?: number;

  @ApiProperty({
    example: 10,
    required: true,
  })
  @IsInt()
  sale?: number;

  @ApiProperty({
    example: 'c3171463-7de0-4347-a172-2b228c46d27f',
    required: true,
  })
  @IsUUID(4)
  categoryId: string;
}
