import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  SetMetadata,
} from '@nestjs/common';
import { ApiBody, ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';
import { CreateProductDto, UpdateProductDto } from './dtos';

@ApiTags('Product')
@Controller({
  path: 'product',
  version: '1.0',
})
export class ProductController {
  #_service: ProductService;

  constructor(service: ProductService) {
    this.#_service = service;
  }

  @ApiHeader({
    name: 'accept-language',
    required: true,
    example: 'uz',
  })
  @SetMetadata("roles", "all")
  @Get()
  async getProductList(
    @Headers('accept-language') languageCode: string,
  ): Promise<Product[]> {
    return await this.#_service.getProductList(languageCode);
  }

  @ApiParam({
    name: 'id',
    example: 'c3171463-7de0-4347-a172-2b228c46d27f',
  })
  @ApiHeader({
    name: 'accept-language',
    required: true,
    example: 'uz',
  })
  @SetMetadata("roles", "all")
  @Get('by-category/:id')
  async getProductsByCategory(
    @Param('id') categoryId: string,
    @Headers('accept-language') languageCode: string,
  ): Promise<Product[]> {
    return await this.#_service.getProductsByCategory(categoryId, languageCode);
  }

  @ApiHeader({
    name: 'accept-language',
    required: true,
    example: 'uz',
  })
  @ApiParam({
    name: 'id',
    example: 'c3171463-7de0-4347-a172-2b228c46d27f',
  })
  @SetMetadata("roles", "all")
  @Get('single/:id')
  async getSingleProduct(
    @Param('id') id: string,
    @Headers('accept-language') languageCode: string,
  ): Promise<void> {
    await this.#_service.getSingleProduct({ productId: id, languageCode });
  }

  @ApiBody({
    type: CreateProductDto,
    required: true,
  })
  @SetMetadata("roles", ["admin", "super_admin"])
  @Post()
  async createProduct(@Body() payload: CreateProductDto): Promise<void> {
    await this.#_service.createProduct(payload);
  }

  @ApiParam({
    name: 'id',
    example: 'c3171463-7de0-4347-a172-2b228c46d27f',
  })
  @SetMetadata("roles", ["admin", "super_admin"])
  @Patch(':id')
  async updateProduct(
    @Body() payload: UpdateProductDto,
    @Param('id') id: string,
  ): Promise<void> {
    await this.#_service.updateProduct({ ...payload, id });
  }

  @ApiParam({
    name: 'id',
    example: 'c3171463-7de0-4347-a172-2b228c46d27f',
  })
  @SetMetadata("roles", ["admin", "super_admin"])
  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<void> {
    await this.#_service.deleteProduct(id);
  }
}
