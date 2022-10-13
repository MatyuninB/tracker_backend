import TimePointEntity from 'src/time-point/entities/time-point.entity';
import { BaseInterfaceRepository } from 'src/repositories/base/base.interface.repository';

export interface TimePointRepositoryInterface
  extends BaseInterfaceRepository<TimePointEntity> {
  findByTitle(title: string): Promise<TimePointEntity | null>;

  findLastUserTimePoint(userId: number): Promise<TimePointEntity | null>;

  findLastUserTaskTimePoint(
    userId: number,
    taskId: number,
  ): Promise<TimePointEntity | null>;

  findUserTimePoints(
    userId: number,
    startDate?: Date,
    endDate?: Date,
  ): Promise<TimePointEntity[]>;

  findTimePointsByTaskId(
    taskId: number,
    startDate?: Date,
    endDate?: Date,
  ): Promise<TimePointEntity[]>;
}
