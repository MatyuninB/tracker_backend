import ProjectEntity from 'src/entities/project.entity';
import { BaseInterfaceRepository } from 'src/repositories/base/base.interface.repository';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProjectRepositoryInterface
  extends BaseInterfaceRepository<ProjectEntity> {}
