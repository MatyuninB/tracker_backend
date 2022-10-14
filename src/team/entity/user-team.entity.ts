import { BaseEntityInterface } from 'src/entities/base/base.entity.interface';
import { TeamRoleTypeEnum } from 'src/type/TeamRoleTypeEnum';
import { UserEntityDb } from 'src/user/entities/user.entity';
import { TeamEntityDb } from './team.entity';

interface IUserTeamEntity {
  role: TeamRoleTypeEnum;
  team_id: number;
  user_id: number;
  inviter_id: number;
}

interface IUserTeamEntityRelattion {
  team: TeamEntityDb;
  user: UserEntityDb;
  inviter: UserEntityDb;
}

interface IUserTeamEntityDb
  extends BaseEntityInterface,
    IUserTeamEntity,
    IUserTeamEntityRelattion {}

export class UserTeamEntity implements IUserTeamEntity {
  role: TeamRoleTypeEnum;
  team_id: number;
  user_id: number;
  inviter_id: number;
}

export class UserTeamEntityDb implements IUserTeamEntityDb {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  role: TeamRoleTypeEnum;
  team_id: number;
  user_id: number;
  inviter_id: number;
  team: TeamEntityDb;
  user: UserEntityDb;
  inviter: UserEntityDb;
}
