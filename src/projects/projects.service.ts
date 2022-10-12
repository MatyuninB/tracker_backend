import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from 'src/user/interface/user.repository.interface';
import { ProjectDTO } from './dto/projects.dto';
import { ProjectRepositoryInterface } from './interface/project.repository.interface';

@Injectable()
export class ProjectsService {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    @Inject('ProjectRepositoryInterface')
    private readonly projectRepository: ProjectRepositoryInterface,
  ) {}

  async getAllProjects() {
    return await this.projectRepository.findAll();
  }

  async getProjectsByUserId(userId: number) {
    return this.projectRepository.find({
      relations: ['users'],
      where: { users: { id: userId } },
    });
  }

  async createProject(data: ProjectDTO) {
    const project = await this.projectRepository.findOne({
      where: { title: data.title },
    });

    if (project) {
      throw new BadRequestException(
        'A project with the same name already exists',
      );
    }
    await this.projectRepository.save(data);
  }

  async assignUser(userId: number, projectId: number) {
    const user = await this.userRepository.findOneOrFail({
      where: { id: userId },
    });
    return await this.projectRepository.update(projectId, { users: [user] });
  }

  async disableProject(projectId: number) {
    return this.projectRepository.update(projectId, { disabled: true });
  }
}
