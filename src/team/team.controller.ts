import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RoleTypeEnum } from 'src/type/RoleTypeEnum';
import { RoleCheck } from 'src/user/decorators/role.decorator';
import { CreateTeamDTO } from './dto/createTeamDTO.dto';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
  constructor(private teamSetvice: TeamService) {}

  @Post()
  @RoleCheck(RoleTypeEnum.ADMIN)
  async createTeam(@Body() body: CreateTeamDTO) {
    try {
      return await this.teamSetvice.createTeam(body.title);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  async getAllTeams() {
    try {
      return await this.teamSetvice.getAllTeams();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getTeam(@Query() { teamId }) {
    try {
      return await this.teamSetvice.getTeamWithUsers({ teamId });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
