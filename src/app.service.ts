import { Injectable, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
