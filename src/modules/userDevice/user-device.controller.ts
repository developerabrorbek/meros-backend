import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { UserDeviceService } from './user-device.service';
import { UserDevice } from '@prisma/client';

@ApiTags('User device')
@Controller('user-device')
export class UserDeviceController {
  #_service: UserDeviceService;

  constructor(service: UserDeviceService) {
    this.#_service = service;
  }

  @Get()
  async getUserDeviceList(): Promise<UserDevice[]> {
    return await this.#_service.getUserDeviceList();
  }

  @ApiParam({
    name: "id",
    example: '796bd1b4-68e1-44a8-b4e4-232349cb81ec',
    required: true,
    description: "Must be UUID 4"
  })
  @Get(':id')
  async getSingleUserDevice(@Param('id') id: string): Promise<UserDevice> {
    return await this.#_service.getSingleUserDevice(id);
  }

  @ApiParam({
    name: "id",
    example: '796bd1b4-68e1-44a8-b4e4-232349cb81ec',
    required: true,
    description: "Must be UUID 4"
  })
  @Delete(':id')
  async deleteUserDevice(@Param('id') id: string): Promise<void> {
    await this.#_service.deleteUserDevice(id);
  }
}
