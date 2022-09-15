import { Injectable } from '@nestjs/common';
import { userFromGoogle } from 'src/helpers/userFromGoogle';
import { JwtAuthService } from '../jwt/jwt-auth.service';

@Injectable()
export class GoogleAuthService {
  constructor(private jwtAuthService: JwtAuthService){};
  async googleLogin(req) {
    return await this.jwtAuthService.login(req.user);
  }
}
