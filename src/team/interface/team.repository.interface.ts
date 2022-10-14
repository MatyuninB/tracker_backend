import { TeamEntity, TeamEntityDb } from 'src/team/entity/team.entity';
import { BaseInterfaceRepository } from 'src/repositories/base/base.interface.repository';

export interface TeamRepositoryInterface
  extends BaseInterfaceRepository<TeamEntity, TeamEntityDb> {
  findOneByTitle(title: string): Promise<TeamEntityDb | null>;
  findManyWithUsers(): Promise<TeamEntityDb[]>;
  findOneByIdWithUsers(id: number): Promise<TeamEntityDb | null>;
}
