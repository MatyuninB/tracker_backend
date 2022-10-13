import { TaskEntity } from 'src/task/entities/task.entity';
import { BaseInterfaceRepository } from 'src/repositories/base/base.interface.repository';

export interface TaskRepositoryInterface
  extends BaseInterfaceRepository<TaskEntity> {
  findByUserId(id: number): Promise<TaskEntity>;
}
