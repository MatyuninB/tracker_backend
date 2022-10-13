import TeamEntity from 'src/team/entity/team.entity';
import { BaseInterfaceRepository } from 'src/repositories/base/base.interface.repository';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TeamRepositoryInterface
  extends BaseInterfaceRepository<TeamEntity> {}
