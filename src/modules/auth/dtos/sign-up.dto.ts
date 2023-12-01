import { $Enums } from "@prisma/client";
import { SingupRequest } from "../interfaces";
import { IsEmail, IsEnum, IsOptional, IsString, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignUpDto implements SingupRequest {
  @ApiProperty({
    example: 'sobochka@gmail.com'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    enum: $Enums.GenderType
  })
  @IsEnum($Enums.GenderType)
  gender: $Enums.GenderType;

  @ApiProperty({
    example: 'device ip for mobile developers'
  })
  @IsString()
  @IsOptional()
  ip?: string;

  @ApiProperty({
    example: 'Nuriddinov Xurshidbek'
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '1234asda'
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: '939386462'
  })
  @Matches(/^(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/)
  @IsString()
  phone: string;

  @ApiProperty({
    example: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
  })
  @IsString()
  @IsOptional()
  userAgent?: string;

  @ApiProperty({
    example: 'username'
  })
  @IsString()
  username: string;
}