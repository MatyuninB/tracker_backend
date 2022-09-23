import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RoleTypeEnum } from 'src/type/RoleTypeEnum';

import { RoleCheck } from './decorators/role.decorator';
import { AssignTeamDTO } from './dto/assignTeam.dto';
import { UpdateRoleDTO } from './dto/updateRole.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userSevice: UserService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Req() req) {
    return await this.userSevice.getUserInfo(req.user);
  }

  @Patch('role')
  @RoleCheck(RoleTypeEnum.ADMIN)
  @HttpCode(HttpStatus.OK)
  async updateRole(@Req() req, @Body() body: UpdateRoleDTO) {
    const { userId, role } = body;
    await this.userSevice.updateUserRole(userId, role);
    return `role updated ${role}`;
  }

  @Patch('team')
  @RoleCheck([RoleTypeEnum.ADMIN, RoleTypeEnum.MANAGER])
  async assignTeam(@Req() req, @Body() { teamId, userId }: AssignTeamDTO) {
    return await this.userSevice.assignTeam({
      user: req.user,
      teamId,
      userId,
    });
  }
}
