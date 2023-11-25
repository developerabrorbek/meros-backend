import { User } from '@prisma/client';
import { UserService } from './user.service';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from './dtos';

@ApiTags('Users')
@Controller('user')
export class UserController {
  #_service: UserService;

  constructor(service: UserService) {
    this.#_service = service;
  }

  @Get('/all')
  async getUserList(): Promise<User[]> {
    return await this.#_service.getUserList();
  }

  @ApiParam({
    name: 'id',
    example: '796bd1b4-68e1-44a8-b4e4-232349cb81ec',
    required: true,
  })
  @Get(':id')
  async getSingleUser(@Param('id') id: string): Promise<User> {
    return await this.#_service.getSingleUser(id);
  }

  @ApiBody({
    type: CreateUserDto,
    required: true,
  })
  @Post()
  async createUser(@Body() payload: CreateUserDto): Promise<void> {
    await this.#_service.createUser(payload);
  }

  @ApiParam({
    name: 'id',
    example: '796bd1b4-68e1-44a8-b4e4-232349cb81ec',
    required: true,
  })
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() payload: UpdateUserDto,
  ): Promise<void> {
    await this.#_service.updateUser({ id, ...payload });
  }


  @ApiParam({
    name: 'id',
    example: '796bd1b4-68e1-44a8-b4e4-232349cb81ec',
    required: true,
  })
  @Delete(":id")
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.#_service.deleteUser(id);
  }
}
