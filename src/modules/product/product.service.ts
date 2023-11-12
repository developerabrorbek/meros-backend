import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateProductRequest, GetSingleProductRequest } from './interfaces';
import { isUUID } from 'class-validator';
import { UpdateProductRequest } from './interfaces/update-product.interfaces';
import { MinioService } from 'client';
import { ConfigService } from '@nestjs/config';
import { TranslateService } from 'modules/translate';

@Injectable()
export class ProductService {
  #_prisma: PrismaService;
  #_minio: MinioService;
  #_config: ConfigService;
  #_translate: TranslateService;

  constructor(
    prisma: PrismaService,
    minio: MinioService,
    config: ConfigService,
    translate: TranslateService,
  ) {
    this.#_prisma = prisma;
    this.#_minio = minio;
    this.#_config = config;
    this.#_translate = translate;
  }

  async getProductList(languageCode: string): Promise<Product[]> {
    await this.#_checkLanguage(languageCode);
    const filteredProducts = [];
    const products = await this.#_prisma.product.findMany();
    for (const p of products) {
      const translatedProduct = await this.#_getProductTranslates(
        p,
        languageCode,
      );
      filteredProducts.push(translatedProduct);
    }
    return filteredProducts;
  }

  async getProductsByCategory(
    categoryId: string,
    languageCode: string,
  ): Promise<Product[]> {
    await this.#_checkLanguage(languageCode);
    await this.#_checkUUID(categoryId);
    const filteredProducts = [];
    const products = await this.#_prisma.product.findMany({
      where: { categoryId },
    });
    for (const p of products) {
      const translatedProduct = await this.#_getProductTranslates(
        p,
        languageCode,
      );
      filteredProducts.push(translatedProduct);
    }
    return filteredProducts;
  }

  async getSingleProduct(payload: GetSingleProductRequest): Promise<Product> {
    await this.#_checkUUID(payload.productId);
    await this.#_checkLanguage(payload.languageCode);
    const product = await this.#_prisma.product.findFirst({
      where: { id: payload.productId },
    });
    const translatedProduct = await this.#_getProductTranslates(
      product,
      payload.languageCode,
    );
    return translatedProduct;
  }

  async createProduct(payload: CreateProductRequest) {
    try {
      await this.#_checkTranslate([payload.description, payload.title])
      const imagesLinks = [];
      for (const image of payload.images) {
        const link = await this.#_minio.uploadImage({
          bucket: this.#_config.getOrThrow<string>('minio.bucket'),
          file: image,
        });
        imagesLinks.push(link.image);
      }
      await this.#_prisma.product.create({
        data: {
          title: payload.title,
          images: {
            set: imagesLinks,
          },
          count: payload.count,
          description: payload.description,
          price: payload.price,
          rating: payload.rating,
          sale: payload.sale,
          categoryId: payload.categoryId,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateProduct(payload: UpdateProductRequest): Promise<void> {
    try {
      await this.#_checkUUID(payload.id);
      await this.#_checkProduct(payload.id);
      await this.#_checkTranslate([payload.description, payload.title])
      const imageLink = await this.#_minio.uploadImage({
        bucket: this.#_config.getOrThrow<string>('minio.bucket'),
        file: payload.image,
      });
      await this.#_prisma.product.update({
        where: { id: payload.id },
        data: {
          title: payload.title,
          images: {
            push: imageLink.image,
          },
          count: payload.count,
          description: payload.description,
          price: payload.price,
          rating: payload.rating,
          sale: payload.sale,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteProduct(id: string): Promise<void> {
    await this.#_checkUUID(id);
    await this.#_checkProduct(id);

    await this.#_prisma.product.delete({ where: { id } });
  }

  async #_checkUUID(id: string) {
    if (!isUUID(id, 4)) {
      throw new UnprocessableEntityException(
        `Given ${id} id is not valid UUID`,
      );
    }
  }

  async #_checkProduct(id: string): Promise<void> {
    const product = await this.#_prisma.product.findFirst({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }
  }

  async #_checkLanguage(languageCode: string): Promise<void> {
    const language = await this.#_prisma.language.findFirst({
      where: { code: languageCode },
    });

    if (!language) {
      throw new NotFoundException(`Language ${languageCode} not found`);
    }
  }

  async #_getProductTranslates(
    product: Product,
    languageCode: string,
  ): Promise<Product> {
    await this.#_checkTranslate([product.title, product.description]);
    const title = await this.#_translate.getSingleTranslate({
      languageCode,
      translateId: product.title,
    });
    const description = await this.#_translate.getSingleTranslate({
      languageCode,
      translateId: product.description,
    });
    return {
      ...product,
      description: description.value,
      title: title.value,
    };
  }

  async #_checkTranslate(payload: string[]): Promise<void> {
    for (const translateId of payload) {
      const translate = await this.#_prisma.translate.findFirst({
        where: { id: translateId },
      });

      if (!translate) {
        throw new NotFoundException(`Translate ${translateId} not found`);
      }
    }
  }
}
