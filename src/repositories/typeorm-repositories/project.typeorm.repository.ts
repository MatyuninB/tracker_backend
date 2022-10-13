import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectTypeormEntity } from 'src/entities/typeorm-entities/project.typeorm.entity';
import { ProjectRepositoryInterface } from 'src/projects/interface/project.repository.interface';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base.typeorm.abstract.repository';

@Injectable()
export class ProjectTypeormRepository
  extends BaseAbstractRepository<ProjectTypeormEntity>
  implements ProjectRepositoryInterface
{
  constructor(
    @InjectRepository(ProjectTypeormEntity)
    private readonly projectRepository: Repository<ProjectTypeormEntity>,
  ) {
    super(projectRepository);
  }
  async findOneByTitle(title: string): Promise<ProjectTypeormEntity | null> {
    return await this.projectRepository.findOne({
      where: { title },
    });
  }

  async findManyByUserId(userId: number): Promise<ProjectTypeormEntity[]> {
    return await this.projectRepository.find({ where: { user_id: userId } });
  }
}
