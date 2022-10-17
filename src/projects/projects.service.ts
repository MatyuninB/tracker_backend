import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from 'src/user/interface/user.repository.interface';
import { ProjectDTO } from './dto/projects.dto';
import { ProjectEntity } from './entity/project.entity';
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
    return this.projectRepository.findManyByUserId(userId);
  }

  async createProject(data: ProjectDTO, userId: number) {
    const project = await this.projectRepository.findOneByTitle(data.title);
    if (project) {
      throw new BadRequestException(
        'A project with the same name already exists',
      );
    }

    const projectEntity: ProjectEntity = {
      title: data.title,
      picture: data.picture,
      disabled: false,
      user_id: userId,
    };
    await this.projectRepository.save(projectEntity);
  }

  async assignUser(userId: number, projectId: number) {
    const user = await this.userRepository.findOneById(userId);
    if (!user) {
      //
    }
    return await this.projectRepository.update(projectId, { users: [user] });
  }

  async disableProject(projectId: number) {
    return this.projectRepository.update(projectId, { disabled: true });
  }
}
