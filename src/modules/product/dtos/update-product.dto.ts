import { ApiProperty } from "@nestjs/swagger";
import { UpdateProductRequest } from "../interfaces/update-product.interfaces";
import { IsBase64, IsInt, IsNumber, IsOptional, IsUUID } from "class-validator";

export class UpdateProductDto implements Omit<UpdateProductRequest,'id'>{
  @ApiProperty({
    example: 'c3171463-7de0-4347-a172-2b228c46d27f',
    nullable: true,
  })
  @IsOptional()
  @IsUUID(4)
  title?: string;

  @ApiProperty({
    example: 'base64image',
    nullable: true,
  })
  @IsOptional()
  @IsBase64()
  image?: string;

  @ApiProperty({
    example: 1,
    nullable: true,
  })
  @IsOptional()
  @IsInt()
  count?: number;

  @ApiProperty({
    example: 'c3171463-7de0-4347-a172-2b228c46d27f',
    nullable: true,
  })
  @IsOptional()
  @IsUUID(4)
  description?: string;

  @ApiProperty({
    example: 10000,
    nullable: true,
  })
  @IsOptional()
  @IsInt()
  price?: number;

  @ApiProperty({
    example: 4.5,
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  rating?: number;

  @ApiProperty({
    example: 10,
    nullable: true,
  })
  @IsOptional()
  @IsInt()
  sale?: number;
}