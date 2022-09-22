import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { AddTimePointDTO } from './dto/addTimePoint.dto';
import { TimeService } from './time.service';

@Controller('time')
export class TimeController {
  constructor(private timeService: TimeService) {}

  @Post('add')
  @UseGuards(JwtAuthGuard)
  async addTimePoint(@Req() req, @Body() body: AddTimePointDTO) {
    try {
      return await this.timeService.addTimepoint(req.user, body);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('time-point')
  @UseGuards(JwtAuthGuard)
  async getTodayTimePoint(@Req() req, @Query() query) {
    try {
      const { date } = query || {};
      return await this.timeService.getTimePoints(req.user.id, date);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
