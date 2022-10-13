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
    const user = await this.userRepository.findOneById(userId);
    if (!user) {
      //
    }

    const project = await this.projectRepository.findOneById(projectId);
    if (!project) {
      //
    }

    const task = await this.taskRepository.findOneByTitle(title);
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
    return await this.taskRepository.findOneByUserId(userId);
  }

  async removeById(id: number) {
    const task = await this.taskRepository.findOneById(id);
    if (!task) {
      throw new BadRequestException(); // TODO
    }
    return await this.taskRepository.remove(task.id);
  }
}
