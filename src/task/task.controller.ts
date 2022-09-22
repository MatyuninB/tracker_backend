import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
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
    return await this.taskService.create(createTaskDto, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async find(
    @Req() { user: { id } }: { user: { id: number } },
    @Query() query: { search: string },
  ) {
    return await this.taskService.find({ id, search: query.search });
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Body() body: { id: number }) {
    return await this.taskService.remove(body.id);
  }
}
