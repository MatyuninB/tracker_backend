import { BaseAbstractEntity } from 'src/entities/base/base.abstract.entity';
import { TeamRoleTypeEnum } from 'src/type/TeamRoleTypeEnum';
import TeamEntity from './team.entity';
import UserEntity from '../../user/entities/user.entity';

export default class UserTeamEntity extends BaseAbstractEntity {
  role: TeamRoleTypeEnum;
  team_id: number;
  user_id: number;
  inviter_id: number;
  team: TeamEntity;
  user: UserEntity;
  inviter: UserEntity;
}
