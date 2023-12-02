import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Post,
  SetMetadata,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dtos';
import { ApiBody, ApiHeader, ApiTags } from '@nestjs/swagger';
import { SignInResponse, SignUpResponse } from './interfaces';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  #_service: AuthService;

  constructor(service: AuthService) {
    this.#_service = service;
  }

  @ApiBody({
    type: SignUpDto,
    required: true,
  })
  @SetMetadata('roles', 'all')
  @Post('/register')
  async signUp(@Body() payload: SignUpDto): Promise<SignUpResponse> {
    return await this.#_service.signUp(payload);
  }

  @ApiBody({
    type: SignInDto,
    required: true,
  })
  @SetMetadata('roles', 'all')
  @Post('/login')
  async signIn(@Body() payload: SignInDto): Promise<SignInResponse> {
    return await this.#_service.signIn(payload);
  }

  @ApiHeader({
    name: 'refresh-token',
    required: true,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  @SetMetadata("roles", "all")
  @Get('/refresh')
  async refresh(
    @Headers('refresh-token') refreshToken: string,
  ): Promise<SignInResponse> {
    await this.#_service.refresh(refreshToken);
    return {
      accessToken: '',
      refreshToken: '',
    };
  }

  @ApiHeader({
    name: 'Authorization',
    example:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    required: true,
  })
  @Delete('/logout')
  async logout(@Headers('Authorization') refreshToken: string): Promise<void> {
    console.log(refreshToken);
  }
}
