import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskTypeormEntity } from 'src/task/entities/task.typeorm.entity';
import { TimePointTypeormEntity } from './entities/time-point.typeorm.entity';
import { TimePointController } from './time-point.controller';
import { TimePointService } from './time-point.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TimePointTypeormEntity, TaskTypeormEntity]),
  ],
  controllers: [TimePointController],
  providers: [
    TimePointService,
    {
      provide: 'TimePointRepositoryInterface',
      useClass: TimePointTypeormEntity,
    },
    {
      provide: 'TaskRepositoryInterface',
      useClass: TaskTypeormEntity,
    },
  ],
})
export class TimePointModule {}
