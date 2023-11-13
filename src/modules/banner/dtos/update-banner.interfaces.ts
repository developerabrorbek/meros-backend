import { $Enums } from '@prisma/client';
import { UpdateBannerRequest } from '../interfaces';
import { IsBase64, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBannerDto implements Omit<UpdateBannerRequest, 'id'> {
  @ApiProperty({
    example: 'base64 encoded image',
    nullable: true,
  })
  @IsBase64()
  @IsOptional()
  image?: string;

  @ApiProperty({
    examples: ['active', 'inactive'],
    nullable: true,
    enum: $Enums.Status,
  })
  @IsEnum($Enums.Status)
  @IsOptional()
  status?: $Enums.Status;
}
