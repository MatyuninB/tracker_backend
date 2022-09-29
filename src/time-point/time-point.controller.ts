import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { AddStartTimePointDTO } from './dto/addStartTimePoint.dto';
import { AddStopTimePointDTO } from './dto/addStopTimePoint.dto';
import { GetTimePointsByTaskDTO } from './dto/getTimePointsByTask.dto';
import { TimePointIdDto } from './dto/timePointId.dto';
import { UpdateTimePointDTO } from './dto/updateTimePoint.dto';
import { TimePointService } from './time-point.service';

@ApiTags('Time Point')
@ApiBearerAuth('access-token')
@Controller('time-point')
export class TimePointController {
  constructor(private timeService: TimePointService) {}

  @Post('add-start')
  @UseGuards(JwtAuthGuard)
  async addStartTimepoint(@Req() req, @Body() body: AddStartTimePointDTO) {
    const { time, taskId, title, description } = body;
    return await this.timeService.addStartTimepoint(
      req.user,
      time,
      taskId,
      title,
      description,
    );
  }

  @Post('add-stop')
  @UseGuards(JwtAuthGuard)
  async addStopTimepoint(@Req() req, @Body() body: AddStopTimePointDTO) {
    const { time, taskId } = body;
    return await this.timeService.addStopTimepoint(req.user, time, taskId);
  }

  @Get('by-user-task')
  @UseGuards(JwtAuthGuard)
  async getTimePointsByUserTask(
    @Req() req,
    @Query() query: GetTimePointsByTaskDTO,
  ) {
    const { taskId, start, end } = query;
    return await this.timeService.getUserTimePointsByTaskId(
      req.user.id,
      taskId,
      start,
      end,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getTimePoint(@Req() req, @Query() query: TimePointIdDto) {
    const { timePointId } = query;
    return await this.timeService.getTimePoint(req.user, timePointId);
  }

  @Patch('update')
  @UseGuards(JwtAuthGuard)
  async updateTimePoint(@Req() req, @Body() body: UpdateTimePointDTO) {
    const { timePointId, title, description, start, end } = body;
    return await this.timeService.updateTimePoint(
      req.user,
      timePointId,
      title,
      description,
      start,
      end,
    );
  }
}
