import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TimePointTypeormEntity } from 'src/entities/typeorm-entities/time-point.typeorm.entity';
import { TimePointRepositoryInterface } from 'src/time-point/interface/timepoint.repository.interface';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base.typeorm.abstract.repository';

@Injectable()
export class TimePointTypeormRepository
  extends BaseAbstractRepository<TimePointTypeormEntity>
  implements TimePointRepositoryInterface
{
  constructor(
    @InjectRepository(TimePointTypeormEntity)
    private readonly timePointRepository: Repository<TimePointTypeormEntity>,
  ) {
    super(timePointRepository);
  }

  async findByTitle(title: string): Promise<TimePointTypeormEntity | null> {
    return await this.timePointRepository.findOne({ where: { title } });
  }

  async findLastUserTimePoint(
    userId: number,
  ): Promise<TimePointTypeormEntity | null> {
    return await this.timePointRepository.findOne({
      order: { end: 'DESC' },
      where: { user_id: userId },
    });
  }

  async findLastUserTaskTimePoint(
    userId: number,
    taskId: number,
  ): Promise<TimePointTypeormEntity | null> {
    return await this.timePointRepository.findOne({
      order: { end: 'DESC' },
      where: { user_id: userId, task_id: taskId },
    });
  }

  async findUserTimePoints(
    userId: number,
    startDate?: Date,
    endDate?: Date,
  ): Promise<TimePointTypeormEntity[]> {
    if (startDate && endDate) {
      return await this.timePointRepository.find({
        where: { user_id: userId, start: startDate, end: endDate },
      });
    } else if (startDate) {
      return await this.timePointRepository.find({
        where: { user_id: userId, start: startDate },
      });
    } else if (endDate) {
      return await this.timePointRepository.find({
        where: { user_id: userId, end: endDate },
      });
    }

    return await this.timePointRepository.find({
      where: { user_id: userId },
      order: { start: 'ASC' },
    });
  }

  async findTimePointsByTaskId(
    taskId: number,
    startDate?: Date,
    endDate?: Date,
  ): Promise<TimePointTypeormEntity[]> {
    if (startDate && endDate) {
      return await this.timePointRepository.find({
        where: { task_id: taskId, start: startDate, end: endDate },
      });
    } else if (startDate) {
      return await this.timePointRepository.find({
        where: { task_id: taskId, start: startDate },
      });
    } else if (endDate) {
      return await this.timePointRepository.find({
        where: { task_id: taskId, end: endDate },
      });
    }

    return await this.timePointRepository.find({
      where: { task_id: taskId },
      order: { start: 'ASC' },
    });
  }
}
