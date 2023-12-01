import {
  CanActivate,
  ConflictException,
  ExecutionContext,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { RolesType } from '@prisma/client';
import { Request } from 'express';

@Injectable()
export class CheckRolesGuard implements CanActivate {
  #_jwt: JwtService;
  #_config: ConfigService;

  constructor(
    private reflector: Reflector,
    jwt: JwtService,
    config: ConfigService,
  ) {
    this.#_config = config;
    this.#_jwt = jwt;
  }

  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<RolesType[] | 'all'>(
      'roles',
      [context.getHandler(), context.getClass()],
    );

    if (requiredRoles == 'all') {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const accessToken: any = request.headers['access-token'];

    const role: any = this.#_checkJWT(accessToken);

    if (!requiredRoles.some((r) => r == role)) {
      throw new ConflictException(
        "User don't have permission to do this thing!",
      );
    }

    return true;
  }

  #_checkJWT(accessToken: string): RolesType {
    try {
      const data = this.#_jwt.verify(accessToken, {
        secret: this.#_config.getOrThrow<string>('jwt.accessTokenSecretKey'),
      });
      return data.role;
    } catch (error) {
      throw new UnprocessableEntityException(error?.message || 'JWT error');
    }
  }
}
