import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskTypeormEntity } from 'src/task/entities/task.typeorm.entity';
import { TaskRepositoryInterface } from 'src/task/interface/task.repository.interface';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base.typeorm.abstract.repository';

@Injectable()
export class TaskTypeormRepository
  extends BaseAbstractRepository<TaskTypeormEntity>
  implements TaskRepositoryInterface
{
  constructor(
    @InjectRepository(TaskTypeormEntity)
    private readonly taskRepository: Repository<TaskTypeormEntity>,
  ) {
    super(taskRepository);
  }
  async findByUserId(id: number): Promise<TaskTypeormEntity> {
    return await this.taskRepository.findOne({ where: { user_id: id } });
  }
}
