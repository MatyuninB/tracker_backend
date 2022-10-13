import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { userFromGoogle } from 'src/helpers/userFromGoogle';
import { UserTypeormEntity } from 'src/entities/typeorm-entities/user.typeorm.entity';
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
      if (!data) {
        throw new BadRequestException(); // TODO:
      }
      const userExits = await this.userService.findUserByEmail(data);
      let dbUser: UserTypeormEntity;

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
    } catch (e: any) {
      throw new HttpException(e, 404);
    }
  }
}
