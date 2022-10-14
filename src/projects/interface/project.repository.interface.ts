import { BaseInterfaceRepository } from 'src/repositories/base/base.interface.repository';
import { ProjectEntity, ProjectEntityDb } from '../entity/project.entity';

export interface ProjectRepositoryInterface
  extends BaseInterfaceRepository<ProjectEntity, ProjectEntityDb> {
  findOneByTitle(title: string): Promise<ProjectEntityDb | null>;
  findManyByUserId(userId: number): Promise<ProjectEntityDb[]>;
}
