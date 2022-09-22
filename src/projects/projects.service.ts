import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { ProjectDTO } from './dto/projects.dto';
import { ProjectEntity } from './entity/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>,
  ) {}

  async getAllProjects() {
    return await this.projectRepository.find();
  }

  async getProjectsByUserId(userId: number) {
    return this.projectRepository.find({
      relations: ['users'],
      where: { users: { id: userId } },
    });
  }

  async createProject(data: ProjectDTO) {
    const project = this.projectRepository.findOne({
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
