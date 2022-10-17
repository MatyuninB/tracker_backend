import { BaseEntityInterface } from 'src/entities/base/base.entity.interface';

interface ITeamEntity {
  title: string;
  description?: string;
}

interface ITeamEntityDb extends BaseEntityInterface, ITeamEntity {}

export class TeamEntity implements ITeamEntity {
  title: string;
  description?: string;
}

export class TeamEntityDb implements ITeamEntityDb {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
}
