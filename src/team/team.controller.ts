import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RoleTypeEnum } from 'src/type/RoleTypeEnum';
import { RoleCheck } from 'src/user/decorators/role.decorator';
import { CreateTeamDTO } from './dto/createTeamDTO.dto';
import { TeamService } from './team.service';

@ApiTags('Team')
@Controller('team')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Post()
  @ApiBearerAuth('access-token')
  @RoleCheck(RoleTypeEnum.ADMIN)
  async createTeam(@Body() body: CreateTeamDTO) {
    return await this.teamService.createTeam(body.title);
  }

  @Get('all')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  async getAllTeams() {
    return await this.teamService.getAllTeams();
  }

  @Get()
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  async getTeam(@Query('teamId') teamId: number) {
    return await this.teamService.getTeamWithUsers(teamId);
  }
}
