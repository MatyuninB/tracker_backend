import TeamEntity from 'src/entities/team.entity';
import { BaseInterfaceRepository } from 'src/repositories/base/base.interface.repository';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TeamRepositoryInterface
  extends BaseInterfaceRepository<TeamEntity> {}
