import { TaskEntity } from 'src/task/entities/task.entity';
import { TaskRepositoryInterface } from 'src/task/interface/task.repository.interface';

export class TaskRepository implements TaskRepositoryInterface {
  create(data?: any): TaskEntity {
    throw new Error('Method not implemented.');
  }
  find(data: any): Promise<TaskEntity[]> {
    throw new Error('Method not implemented.');
  }
  findOneOrFail(data: any): Promise<TaskEntity> {
    throw new Error('Method not implemented.');
  }
  update(data: any, data2: any): Promise<TaskEntity> {
    throw new Error('Method not implemented.');
  }
  findOne(data: any): Promise<TaskEntity> {
    throw new Error('Method not implemented.');
  }
  findByUserId(id: number): Promise<TaskEntity> {
    throw new Error('Method not implemented.');
  }
  findOneById(id: number): Promise<TaskEntity> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<TaskEntity[]> {
    throw new Error('Method not implemented.');
  }
  remove(id: string | number): Promise<any> {
    throw new Error('Method not implemented.');
  }
  save(data: any): Promise<TaskEntity> {
    throw new Error('Method not implemented.');
  }
}
