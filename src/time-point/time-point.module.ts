import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskTypeormEntity } from 'src/entities/typeorm-entities/task.typeorm.entity';
import { TaskTypeormRepository } from 'src/repositories/typeorm-repositories/task.typeorm.repository';
import { TimePointTypeormRepository } from 'src/repositories/typeorm-repositories/time-point.typeorm.repository';
import { TimePointTypeormEntity } from '../entities/typeorm-entities/time-point.typeorm.entity';
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
      useClass: TimePointTypeormRepository,
    },
    {
      provide: 'TaskRepositoryInterface',
      useClass: TaskTypeormRepository,
    },
  ],
})
export class TimePointModule {}
