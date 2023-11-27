import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UserDevice } from '@prisma/client';
import { isUUID } from 'class-validator';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserDeviceService {
  #_prisma: PrismaService;

  constructor(prisma: PrismaService) {
    this.#_prisma = prisma;
  }

  async getUserDeviceList(): Promise<UserDevice[]> {
    return await this.#_prisma.userDevice.findMany();
  }

  async getSingleUserDevice(id: string): Promise<UserDevice> {
    this.#_checkUUID(id);
    return await this.#_prisma.userDevice.findFirst({ where: { id } });
  }

  async deleteUserDevice(id: string): Promise<void> {
    await this.#_prisma.userDevice.delete({ where: { id } });
  }

  #_checkUUID(id: string): void {
    if (!isUUID(id, 4)) {
      throw new UnprocessableEntityException(
        `Given ${id} id is not valid UUID`,
      );
    }
  }
}
