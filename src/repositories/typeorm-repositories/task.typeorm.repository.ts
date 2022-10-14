import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskTypeormEntity } from 'src/entities/typeorm-entities/task.typeorm.entity';
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
  async findOneByUserId(id: number): Promise<TaskTypeormEntity | null> {
    return await this.taskRepository.findOne({ where: { user_id: id } });
  }

  async findOneByTitle(title: string): Promise<TaskTypeormEntity | null> {
    return await this.taskRepository.findOne({ where: { title } });
  }
}
