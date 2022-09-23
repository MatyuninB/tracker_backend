import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { TaskEntity } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(userId: number, title: string, description: string) {
    const user = await this.userRepository.findOneOrFail({
      where: { id: userId },
    });
    const task = await this.taskRepository.findOne({ where: { title, user } });
    if (task) {
      throw new BadRequestException('A task with the same name already exists');
    }
    return await this.taskRepository.save({ user, title, description });
  }

  async findByUserId(userId: number) {
    return await this.taskRepository.find({ where: { user: { id: userId } } });
  }

  async removeById(id: number) {
    const task = await this.taskRepository.findOneOrFail({ where: { id } });
    return await this.taskRepository.remove(task);
  }
}
