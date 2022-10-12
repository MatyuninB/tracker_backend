import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ProjectRepositoryInterface } from 'src/projects/interface/project.repository.interface';
import { UserRepositoryInterface } from 'src/user/interface/user.repository.interface';
import { TaskRepositoryInterface } from './interface/task.repository.interface';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TaskRepositoryInterface')
    private readonly taskRepository: TaskRepositoryInterface,
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    @Inject('ProjectRepositoryInterface')
    private readonly projectRepository: ProjectRepositoryInterface,
  ) {}

  async create(
    userId: number,
    projectId: number,
    title: string,
    description: string,
  ) {
    const user = await this.userRepository.findOneOrFail({
      where: { id: userId },
    });

    const project = await this.projectRepository.findOneOrFail({
      where: { id: projectId },
    });

    const task = await this.taskRepository.findOne({ where: { title, user } });
    if (task) {
      throw new BadRequestException('A task with the same name already exists');
    }
    return await this.taskRepository.save({
      user,
      project,
      title,
      description,
    });
  }

  async findByUserId(userId: number) {
    return await this.taskRepository.findByUserId(userId);
  }

  async removeById(id: number) {
    // const task = await this.taskRepository.findOneOrFail({ where: { id } });
    const task = await this.taskRepository.findOneById(id);
    return await this.taskRepository.remove(task.id);
  }
}
