import { BaseInterfaceRepository } from 'src/repositories/base/base.interface.repository';
import {
  TimePointEntity,
  TimePointEntityDb,
} from '../entities/time-point.entity';

export interface TimePointRepositoryInterface
  extends BaseInterfaceRepository<TimePointEntity, TimePointEntityDb> {
  findByTitle(title: string): Promise<TimePointEntity | null>;

  findLastUserTimePoint(userId: number): Promise<TimePointEntity | null>;

  findLastUserTaskTimePoint(
    userId: number,
    taskId: number,
  ): Promise<TimePointEntityDb | null>;

  findUserTimePoints(
    userId: number,
    startDate?: Date,
    endDate?: Date,
  ): Promise<TimePointEntityDb[]>;

  findTimePointsByTaskId(
    taskId: number,
    startDate?: Date,
    endDate?: Date,
  ): Promise<TimePointEntityDb[]>;
}
