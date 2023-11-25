import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { User } from '@prisma/client';
import { isUUID } from 'class-validator';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateUserRequest, UserCreateRequest } from './interfaces';

@Injectable()
export class UserService {
  #_prisma: PrismaService;

  constructor(prisma: PrismaService) {
    this.#_prisma = prisma;
  }

  async getUserList(): Promise<User[]> {
    return await this.#_prisma.user.findMany();
  }

  async getSingleUser(id: string): Promise<User> {
    this.#_checkUUID(id);
    return await this.#_prisma.user.findFirst({ where: { id } });
  }

  async createUser(payload: UserCreateRequest): Promise<void> {
    await this.#_prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        gender: payload.gender,
        password: payload.password,
        role: payload.role,
        phone: payload.phone,
        username: payload.username,
      },
    });
  }

  async updateUser(payload: UpdateUserRequest): Promise<void> {
    await this.#_prisma.user.update({
      where: { id: payload.id },
      data: {
        email: payload.email,
        gender: payload.gender,
        image: payload.image,
        name: payload.name,
        password: payload.password,
        phone: payload.phone,
        role: payload.role,
        username: payload.username,
        year: payload.year,
      },
    });
  }

  async deleteUser(id: string): Promise<void> {
    this.#_checkUUID(id);
    await this.#_prisma.user.delete({ where: { id } });
  }

  #_checkUUID(id: string): void {
    if (!isUUID(id, 4)) {
      throw new UnprocessableEntityException(
        `Given ${id} id is not valid UUID`,
      );
    }
  }
}
