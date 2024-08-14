import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SecurityService {
  constructor(private jwtService: JwtService) {}
  async hash(content: string) {
    try {
      return await argon.hash(content);
    } catch (err) {
      throw new InternalServerErrorException('Hashing Failed');
    }
  }

  async verifyHash(content: string, hash: string) {
    try {
      return await argon.verify(hash, content);
    } catch (err) {
      throw new InternalServerErrorException('Verification Failed');
    }
  }

  async generateToken(data: any) {
    return await this.jwtService.sign(data);
  }

  async decodeToken(token: string) {
    return await this.jwtService.verify(token);
  }
}
