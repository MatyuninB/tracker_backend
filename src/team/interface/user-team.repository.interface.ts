import UserTeamEntity from 'src/team/entity/user-team.entity';
import { BaseInterfaceRepository } from 'src/repositories/base/base.interface.repository';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserTeamRepositoryInterface
  extends BaseInterfaceRepository<UserTeamEntity> {}
