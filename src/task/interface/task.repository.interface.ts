import { TaskEntity, TaskEntityDb } from 'src/task/entities/task.entity';
import { BaseInterfaceRepository } from 'src/repositories/base/base.interface.repository';

export interface TaskRepositoryInterface
  extends BaseInterfaceRepository<TaskEntity, TaskEntityDb> {
  findManyByUserId(userId: number): Promise<TaskEntityDb[]>;
  findOneByTitle(title: string): Promise<TaskEntityDb | null>;
}
