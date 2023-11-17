import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
  #_prisma: PrismaService;

  constructor(prisma: PrismaService){
    this.#_prisma = prisma
  }

  async signUp(): Promise<void>{
    
  }
}
