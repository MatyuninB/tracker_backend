import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RoleTypeEnum } from 'src/type/RoleTypeEnum';
import { RoleCheck } from 'src/user/decorators/role.decorator';
import { AssignUserDTO } from './dto/assign-user.dto';
import { ProjectDTO } from './dto/projects.dto';
import { ProjectsService } from './projects.service';

@ApiTags('Projects')
@ApiBearerAuth('access-token')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}
  @Get('all')
  @UseGuards(JwtAuthGuard)
  async getAllProjects() {
    return await this.projectsService.getAllProjects();
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getProjects(@Req() req) {
    return await this.projectsService.getProjectsByUserId(req.user.id);
  }

  @Post()
  @RoleCheck([RoleTypeEnum.MANAGER, RoleTypeEnum.ADMIN])
  async createProject(@Req() req, @Body() body: ProjectDTO) {
    return await this.projectsService.createProject(body, req.user.id);
  }

  @Patch('user')
  @RoleCheck([RoleTypeEnum.MANAGER, RoleTypeEnum.ADMIN])
  async assignUser(@Body() body: AssignUserDTO) {
    const { userId, projectId } = body;
    return await this.projectsService.assignUser(userId, projectId);
  }
}
