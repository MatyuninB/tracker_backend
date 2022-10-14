import { BaseEntityInterface } from 'src/entities/base/base.entity.interface';
import { ProjectEntityDb } from 'src/projects/entity/project.entity';
import { UserEntityDb } from 'src/user/entities/user.entity';

interface ITaskEntity {
  title: string;
  description: string;
  user_id: number;
  project_id: number;
}

interface ITaskEntityRelations {
  user: UserEntityDb;
  project: ProjectEntityDb;
}

interface ITaskEntityDb
  extends BaseEntityInterface,
    ITaskEntity,
    ITaskEntityRelations {}

export class TaskEntity implements ITaskEntity {
  title: string;
  description: string;
  user_id: number;
  project_id: number;
}

export class TaskEntityDb implements ITaskEntityDb {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  user_id: number;
  project_id: number;
  user: UserEntityDb;
  project: ProjectEntityDb;
}
