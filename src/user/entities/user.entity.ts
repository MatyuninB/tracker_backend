import { BaseEntityInterface } from 'src/entities/base/base.entity.interface';
import { ProjectEntityDb } from 'src/projects/entity/project.entity';
import { TimePointEntityDb } from 'src/time-point/entities/time-point.entity';
import { RoleTypeEnum } from 'src/type/RoleTypeEnum';
import { TaskEntityDb } from '../../task/entities/task.entity';

interface IUserEntity {
  name: string;
  lastName: string;
  role: RoleTypeEnum;
  email: string;
  avatar: string;
}

interface IUserEntityRelation {
  tasks: TaskEntityDb[];
  projects: ProjectEntityDb[];
  times: TimePointEntityDb[];
}

interface IUserEntityDb
  extends BaseEntityInterface,
    IUserEntity,
    IUserEntityRelation {}

export class UserEntity implements IUserEntity {
  avatar: string;
  name: string;
  lastName: string;
  role: RoleTypeEnum;
  email: string;
}

export class UserEntityDb implements IUserEntityDb {
  avatar: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  lastName: string;
  role: RoleTypeEnum;
  email: string;
  tasks: TaskEntityDb[];
  projects: ProjectEntityDb[];
  times: TimePointEntityDb[];
}
