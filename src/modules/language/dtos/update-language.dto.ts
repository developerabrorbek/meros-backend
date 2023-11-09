import { IsString, MaxLength } from 'class-validator';
import { UpdateLanguageRequest } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLanguageDto implements Omit<UpdateLanguageRequest, 'id'> {
  @ApiProperty({
    example: "O'zbek tili",
    maxLength: 64,
    required: true
  })
  @IsString()
  @MaxLength(64)
  title: string;
}
