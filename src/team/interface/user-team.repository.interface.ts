import { BaseInterfaceRepository } from 'src/repositories/base/base.interface.repository';
import { UserTeamEntity, UserTeamEntityDb } from '../entity/user-team.entity';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserTeamRepositoryInterface
  extends BaseInterfaceRepository<UserTeamEntity, UserTeamEntityDb> {
  findOneByUserId(userId: number): Promise<UserTeamEntityDb | null>;
}
