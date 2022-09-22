import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RoleTypeEnum } from 'src/type/RoleTypeEnum';
import { RoleCheck } from 'src/user/decorators/role.decorator';
import { ProjectDTO } from './dto/projects.dto';
import { ProjectsService } from './projects.service';

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
  async createProject(@Body() body: ProjectDTO) {
    return await this.projectsService.createProject(body);
  }

  @Patch('user')
  @RoleCheck([RoleTypeEnum.MANAGER, RoleTypeEnum.ADMIN])
  async assignUser(
    @Body() { userId, projectId }: { userId: number; projectId: number },
  ) {
    return await this.projectsService.assignUser(userId, projectId);
  }
}
