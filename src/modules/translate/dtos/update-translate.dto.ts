import { $Enums } from '@prisma/client';
import { UpdateTranslateRequest } from '../interfaces';
import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTranslateDto implements Omit<UpdateTranslateRequest, 'id'> {
  @ApiProperty({
    enum: $Enums.Status,
    required: true,
  })
  @IsEnum($Enums.Status)
  status: $Enums.Status;
}
