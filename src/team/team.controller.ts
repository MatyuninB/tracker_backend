import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RoleTypeEnum } from 'src/type/RoleTypeEnum';
import { RoleCheck } from 'src/user/decorators/role.decorator';
import { AddUserInTeamDTO } from './dto/addUserInTeam.dto';
import { CreateTeamDTO } from './dto/createTeamDTO.dto';
import { DeleteUserInTeamDTO } from './dto/deleteUserInTeam.dto';
import { TeamService } from './team.service';

@ApiTags('Team')
@Controller('team')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @ApiOperation({ summary: 'Вернуть все команды' })
  @Get('all')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  async getAllTeams() {
    return await this.teamService.getAllTeams();
  }

  @ApiOperation({ summary: 'Вернуть команду по id' })
  @Get('/id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  async getTeam(@Query('teamId') teamId: number) {
    return await this.teamService.getTeamWithUsers(teamId);
  }

  @ApiOperation({ summary: 'Создать команду (АДМИН)' })
  @Post('/create')
  @ApiBearerAuth('access-token')
  @RoleCheck(RoleTypeEnum.ADMIN)
  async createTeam(@Body() body: CreateTeamDTO) {
    const { title } = body;
    return await this.teamService.createTeam(title);
  }

  @ApiOperation({ summary: 'Добвить менеджера в команду (АДМИН)' })
  @Post('/add-manager')
  @ApiBearerAuth('access-token')
  @RoleCheck(RoleTypeEnum.ADMIN)
  async addManegerInTeam(@Req() req, @Body() body: AddUserInTeamDTO) {
    const { email, teamId } = body;
    return await this.teamService.addManegerInTeam(req.user, email, teamId);
  }

  @ApiOperation({ summary: 'Добавить пользователя в команду' })
  @Post('/add-user')
  @ApiBearerAuth('access-token')
  async addUserInTeam(@Req() req, @Body() body: AddUserInTeamDTO) {
    const { email, teamId } = body;
    return await this.teamService.addRegularUserInTeam(req.user, email, teamId);
  }

  @ApiOperation({ summary: 'Удалить пользователя из команды' })
  @Delete('/delete-user')
  @ApiBearerAuth('access-token')
  async deleteUserInTeam(@Req() req, @Body() body: DeleteUserInTeamDTO) {
    const { deletedUserId, teamId } = body;
    return await this.teamService.deleteUserInTeam(
      req.user,
      deletedUserId,
      teamId,
    );
  }
}
