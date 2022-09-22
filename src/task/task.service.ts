import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskEntity } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create({ title }: CreateTaskDto, id) {
    const user = await this.userRepository.findOne({ where: { id } });
    return await this.taskRepository.save({ title, user });
  }

  async find({ id, search = '' }: { id: number; search: string }) {
    return await this.taskRepository.find({ where: { user: { id } } });
  }

  async remove(id: number) {
    const task = await this.taskRepository.find({ where: { id } });
    return await this.taskRepository.remove(task);
  }
}
