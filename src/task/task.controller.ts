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

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
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
  async find(@Req() { user }, @Query() query: { search: string }) {
    return await this.taskService.findByUserId(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Body() body: { id: number }) {
    return await this.taskService.removeById(body.id);
  }
}
