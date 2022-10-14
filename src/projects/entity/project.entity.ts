import { BaseEntityInterface } from 'src/entities/base/base.entity.interface';
import { UserEntityDb } from 'src/user/entities/user.entity';

interface IProjectEntity {
  title: string;
  picture: string;
  disabled: boolean;
  user_id: number;
}

interface IProjectEntityRelations {
  users: UserEntityDb[];
}

interface IProjectEntityDb
  extends BaseEntityInterface,
    IProjectEntity,
    IProjectEntityRelations {}

export class ProjectEntity implements IProjectEntity {
  title: string;
  picture: string;
  disabled: boolean;
  user_id: number;
}

export class ProjectEntityDb implements IProjectEntityDb {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  picture: string;
  disabled: boolean;
  user_id: number;
  users: UserEntityDb[];
}
