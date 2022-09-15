import { HttpException, Injectable } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { JwtService } from '@nestjs/jwt';
import { userFromGoogle } from 'src/helpers/userFromGoogle';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from '../strategies/jwt.strategy';

@Injectable()
export class JwtAuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(user) {
    try {
      const data = userFromGoogle(user);
      const userExits = await this.userService.findUserByEmail(data);
      let dbUser: UserEntity;

      if (!userExits) {
        dbUser = await this.userService.createUser(data);
      } else {
        dbUser = userExits;
      }
      const payload: JwtPayload = {
        email: dbUser.email,
        id: dbUser.id,
      };

      return {
        accessToken: this.jwtService.sign(payload),
      };
    } catch (e) {
      return new HttpException(e, 404);
    }
  }
}
