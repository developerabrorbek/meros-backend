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
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { BannerService } from './banner.service';
import { Banner, BannerPriority } from '@prisma/client';
import { CreateBannerDto, UpdateBannerDto } from './dtos';

@ApiTags('Banner')
@Controller({
  path: 'banner',
  version: '1.0',
})
export class BannerController {
  #_service: BannerService;

  constructor(service: BannerService) {
    this.#_service = service;
  }

  @SetMetadata("roles", "all")
  @Get()
  async getBannerList(): Promise<Banner[]> {
    return await this.#_service.getBannerList();
  }

  @ApiParam({
    name: 'priority',
    example: "first",
    enum: BannerPriority,
  })
  @SetMetadata("roles", "all")
  @Get('/priority/:priority')
  async getBannersByPriority(
    @Param('priority') priority: BannerPriority,
  ): Promise<Banner[]> {
    return await this.#_service.getBannerListByPriority(priority);
  }

  @ApiParam({
    name: 'id',
    example: 'aebf8f52-ad1d-4161-994d-2bc297402973'
  })
  @SetMetadata("roles", "all")
  @Get('/single/:id')
  async getSingleBanner(@Param('id') id: string): Promise<Banner> {
    return await this.#_service.getSingleBanner(id);
  }

  @ApiBody({
    type: CreateBannerDto
  })
  @SetMetadata("roles", ["admin", "super_admin"])
  @Post()
  async createBanner(@Body() payload: CreateBannerDto): Promise<void> {
    await this.#_service.createBanner(payload);
  }

  @ApiBody({
    type: UpdateBannerDto
  })
  @ApiParam({
    name: 'id',
    example: 'aebf8f52-ad1d-4161-994d-2bc297402973'
  })
  @SetMetadata("roles", ["admin", "super_admin"])
  @Patch(':id')
  async updateBanner(
    @Body() payload: UpdateBannerDto,
    @Param('id') id: string,
  ): Promise<void> {
    await this.#_service.updateBanner({ ...payload, id });
  }

  @ApiParam({
    name: 'id',
    example: 'aebf8f52-ad1d-4161-994d-2bc297402973'
  })
  @SetMetadata("roles", ["admin", "super_admin"])
  @Delete(':id')
  async deleteBanner(@Param('id') id: string): Promise<void> {
    await this.#_service.deleteBanner(id);
  }
}
