import { Injectable } from '@nestjs/common';
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

  async getProjects({ id }) {
    return this.projectRepository.find({
      relations: ['users'],
      where: { users: { id } },
    });
  }

  async createProject(data: ProjectDTO) {
    await this.projectRepository.save(data);
  }

  async assignUser({ userId, projectId }) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    return await this.projectRepository.update(projectId, { users: [user] });
  }

  async disableProject({ projectId }) {
    return this.projectRepository.update(projectId, { disabled: true });
  }
}
