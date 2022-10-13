import TeamEntity from 'src/team/entity/team.entity';
import { BaseInterfaceRepository } from 'src/repositories/base/base.interface.repository';

export interface TeamRepositoryInterface
  extends BaseInterfaceRepository<TeamEntity> {
  findOneByTitle(title: string): Promise<TeamEntity | null>;
  findManyWithUsers(): Promise<TeamEntity[]>;
  findOneByIdWithUsers(id: number): Promise<TeamEntity | null>;
}
