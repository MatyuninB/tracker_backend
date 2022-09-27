import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from 'src/task/entities/task.entity';
import { TimePointEntity } from './entities/time-point.entity';
import { TimePointController } from './time-point.controller';
import { TimePointService } from './time-point.service';

@Module({
  imports: [TypeOrmModule.forFeature([TimePointEntity, TaskEntity])],
  controllers: [TimePointController],
  providers: [TimePointService],
})
export class TimePointModule {}
