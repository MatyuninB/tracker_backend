import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
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
    try {
      return await this.projectsService.getAllProjects();
    } catch (e) {
      return new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getProjects(@Req() req) {
    return await this.projectsService.getProjects(req.user);
  }

  @Post()
  @RoleCheck([RoleTypeEnum.MANAGER, RoleTypeEnum.ADMIN])
  async createProject(@Body() body: ProjectDTO) {
    return await this.projectsService.createProject(body);
  }

  @Patch('user')
  @RoleCheck([RoleTypeEnum.MANAGER, RoleTypeEnum.ADMIN])
  async assignUser(
    @Body() { userId, projectId }: { userId: string; projectId: string },
  ) {
    return await this.projectsService.assignUser({ userId, projectId });
  }
}
