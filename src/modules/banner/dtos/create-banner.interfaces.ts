import { $Enums, Status } from "@prisma/client";
import { CreateBannerRequest } from "../interfaces";
import { IsBase64, IsEnum, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBannerDto implements CreateBannerRequest {
  @ApiProperty({
    example: 'base64 encoded image',
    required: true
  })
  @IsBase64()
  image: string;

  @ApiProperty({
    examples: ["first", "second", "third", "fourth", "fifth"],
    required: true,
    enum: $Enums.BannerPriority,
  })
  @IsString()
  @IsEnum($Enums.BannerPriority)
  priority: $Enums.BannerPriority;

  @ApiProperty({
    examples: ['active', 'inactive'],
    required: true,
    enum: Status
  })
  @IsString()
  @IsEnum(Status)
  status: Status;
}