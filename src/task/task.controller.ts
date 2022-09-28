import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth('access-token')
  async create(@Req() { user }, @Body() createTaskDto: CreateTaskDto) {
    const { title, description, projectId } = createTaskDto;
    return await this.taskService.create(
      user.id,
      projectId,
      title,
      description,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth('access-token')
  async find(@Req() { user }, @Query() query: { search: string }) {
    return await this.taskService.findByUserId(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  @ApiBearerAuth('access-token')
  async delete(@Body() body: { id: number }) {
    return await this.taskService.removeById(body.id);
  }
}
