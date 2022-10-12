import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleTypeEnum } from 'src/type/RoleTypeEnum';
import { UserTypeormEntity } from '../entities/user.typeorm.entity';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<RoleTypeEnum>(
      'roles',
      context.getHandler(),
    );
    if (!roles.length) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = <UserTypeormEntity>request.user;
    if (!roles.includes(user.role)) {
      throw new UnauthorizedException(`Allowed for users with role ${roles}`);
    }
    return true;
  }
}
