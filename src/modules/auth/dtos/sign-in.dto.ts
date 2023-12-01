import { IsOptional, IsString } from "class-validator";
import { SignInRequest } from "../interfaces";
import { ApiProperty } from "@nestjs/swagger";

export class SignInDto implements SignInRequest {
  @ApiProperty({
    example: 'username'
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'password'
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: '',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  ip?: string;

  @ApiProperty({
    example: 'ip for mobile',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  userAgent?: string;
}