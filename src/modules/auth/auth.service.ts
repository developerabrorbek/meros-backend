import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import {
  CheckExistingUserRequest,
  CheckUserRequest,
  SignInRequest,
  SignInResponse,
  SignUpResponse,
  SingupRequest,
} from './interfaces';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { isJWT } from 'class-validator';

@Injectable()
export class AuthService {
  #_prisma: PrismaService;
  #_jwt: JwtService;
  #_config: ConfigService;

  constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService) {
    this.#_prisma = prisma;
    this.#_jwt = jwt;
    this.#_config = config;
  }

  async signUp(payload: SingupRequest): Promise<SignUpResponse> {
    try {
      await this.#_checkExistingUser({
        email: payload.email,
        password: payload.password,
        username: payload.username,
      });

      const newUser = await this.#_prisma.user.create({
        data: {
          name: payload.name,
          phone: payload.phone,
          gender: payload.gender,
          email: payload.email,
          password: payload.password,
          username: payload.username,
          role: 'user',
        },
      });

      const tokenPayload = { id: newUser.id, role: newUser.role };

      const accessToken = await this.#_jwt.signAsync(tokenPayload, {
        privateKey: this.#_config.getOrThrow<string>(
          'jwt.accessTokenSecretKey',
        ),
        expiresIn: this.#_config.getOrThrow<number>(
          'jwt.accessTokenExpireTime',
        ),
      });

      const refreshToken = await this.#_jwt.signAsync(tokenPayload, {
        privateKey: this.#_config.getOrThrow<string>(
          'jwt.refreshTokenSecretKey',
        ),
        expiresIn: this.#_config.getOrThrow<string>(
          'jwt.refreshTokenExpireTime',
        ),
      });

      await this.#_prisma.userDevice.create({
        data: {
          userAgent: payload.userAgent,
          ip: payload.ip,
          userId: newUser.id,
          accessToken,
          refreshToken,
        },
      });
      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  async signIn(payload: SignInRequest): Promise<SignInResponse> {
    await this.#_checkUser({
      password: payload.password,
      username: payload.username,
    });
    const userDevice = await this.#_prisma.userDevice.findFirst({
      where: { userAgent: payload.userAgent, ip: payload.ip },
    });
    const user = await this.#_prisma.user.findFirst({
      where: { password: payload.password, username: payload.username },
    });

    const tokenPayload = { id: user.id, role: user.role };

    const accessToken = await this.#_jwt.signAsync(tokenPayload, {
      privateKey: this.#_config.getOrThrow<string>('jwt.accessTokenSecretKey'),
      expiresIn: this.#_config.getOrThrow<number>('jwt.accessTokenExpireTime'),
    });

    const refreshToken = await this.#_jwt.signAsync(tokenPayload, {
      privateKey: this.#_config.getOrThrow<string>('jwt.refreshTokenSecretKey'),
      expiresIn: this.#_config.getOrThrow<string>('jwt.refreshTokenExpireTime'),
    });

    if (!userDevice) {
      await this.#_prisma.userDevice.create({
        data: {
          accessToken,
          refreshToken,
          ip: payload.ip,
          userAgent: payload.userAgent,
          userId: user.id,
        },
      });

      return {
        accessToken,
        refreshToken,
      };
    }

    await this.#_prisma.userDevice.update({
      where: { id: userDevice.id },
      data: {
        accessToken,
        refreshToken,
      },
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshToken: string): Promise<void> {
    if (!isJWT(refreshToken)) {
      throw new ConflictException(
        `Given ${refreshToken} refresh token is not valid token`,
      );
    }

    const data = await this.#_jwt.verifyAsync(refreshToken, {
      secret: this.#_config.getOrThrow<string>('jwt.refreshTokenSecretKey'),
    });
    console.log(data);
  }

  async logout(accessToken: string): Promise<void> {
    const token = accessToken.replace('Bearer ', '');
    if (!isJWT(token)) {
      throw new ConflictException(
        `Given ${accessToken} refresh token is not valid token`,
      );
    }

    await this.#_checkUserDevice(token);

    const userDevice = await this.#_prisma.userDevice.findFirst({
      where: { accessToken },
    });

    await this.#_prisma.userDevice.delete({ where: { id: userDevice.id } });
  }

  async #_checkExistingUser(payload: CheckExistingUserRequest): Promise<void> {
    const user = await this.#_prisma.user.findFirst({
      where: {
        username: payload.username,
        password: payload.password,
        email: payload.email,
      },
    });

    if (user) {
      throw new ConflictException('This user already exists');
    }
  }

  async #_checkUser(payload: CheckUserRequest): Promise<void> {
    const user = await this.#_prisma.user.findFirst({
      where: {
        username: payload.username,
        password: payload.password,
      },
    });

    if (!user) {
      throw new NotFoundException(
        `User with username : ${payload.username} and password : ${payload.password} does not exists`,
      );
    }
  }

  async #_checkUserDevice(accessToken: string): Promise<void> {
    const userDevice = await this.#_prisma.userDevice.findFirst({
      where: { accessToken },
    });

    if (!userDevice) {
      throw new NotFoundException('User device not found');
    }
  }
}
