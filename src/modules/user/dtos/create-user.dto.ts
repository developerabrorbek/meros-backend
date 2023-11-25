import { $Enums } from '@prisma/client';
import { UserCreateRequest } from '../interfaces';
import { IsEmail, IsEnum, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements UserCreateRequest {
  @ApiProperty({
    example: "sabachka@gmail.com",
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    enum: $Enums.GenderType,
    required: true,
  })
  @IsEnum($Enums.GenderType)
  gender: $Enums.GenderType;

  @ApiProperty({
    example: "Nuriddinov Xurshidbek",
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: "password",
    required: true,
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: '939386462',
  })
  @Matches(/^(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/)
  @IsString()
  phone: string;

  @ApiProperty({
    enum: $Enums.RolesType,
    required: true,
  })
  @IsEnum($Enums.RolesType)
  role: $Enums.RolesType;

  @ApiProperty({
    example: "username",
    required: true,
  })
  @IsString()
  username: string;
}
