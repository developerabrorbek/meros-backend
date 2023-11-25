import { $Enums } from '@prisma/client';
import { UpdateUserRequest } from '../interfaces';
import {
  IsBase64,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto implements Omit<UpdateUserRequest, 'id'> {
  @ApiProperty({
    example: 'sabochka@gmail.com',
    nullable: true,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    enum: $Enums.GenderType,
    nullable: true,
  })
  @IsEnum($Enums.GenderType)
  gender?: $Enums.GenderType;

  @ApiProperty({
    description: 'base64 encoded image',
    nullable: true,
  })
  @IsBase64()
  @IsOptional()
  image?: string;

  @ApiProperty({
    example: 'Nuriddinov Xurshidbek',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'password',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({
    example: '939386462',
  })
  @Matches(/^(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/)
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({
    enum: $Enums.RolesType,
    nullable: true,
  })
  @IsEnum($Enums.RolesType)
  @IsOptional()
  role?: $Enums.RolesType;

  @ApiProperty({
    example: 'username',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({
    maxLength: 4,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  year?: string;
}
