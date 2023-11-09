import { $Enums, TranslateType } from '@prisma/client';
import { CreateTranslateInterface } from '../interfaces';
import { IsObject, IsString, MaxLength, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTranslateDto implements CreateTranslateInterface {
  @ApiProperty({
    example: 'uz',
    required: true,
  })
  @IsString()
  @MaxLength(2)
  code: string;

  @ApiProperty({
    example: {
      uz: 'salom',
      en: 'hello',
    },
    required: true,
  })
  @IsObject()
  definition: Record<string, string>;

  @ApiProperty({
    examples: ['error', 'content'],
    required: true
  })
  @IsEnum(TranslateType)
  @IsString()
  type: $Enums.TranslateType;
}
