import ProjectEntity from 'src/projects/entity/project.entity';
import { BaseInterfaceRepository } from 'src/repositories/base/base.interface.repository';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProjectRepositoryInterface
  extends BaseInterfaceRepository<ProjectEntity> {
  findOneByTitle(title: string): Promise<ProjectEntity | null>;
  findManyByUserId(userId: number): Promise<ProjectEntity[]>;
}
