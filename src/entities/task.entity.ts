import { BaseAbstractEntity } from 'src/entities/base/base.abstract.entity';
import ProjectEntity from './project.entity';
import UserEntity from './user.entity';

export class TaskEntity extends BaseAbstractEntity {
  title: string;
  description: string;
  user_id: number;
  project_id: number;
  user: UserEntity;
  project: ProjectEntity;
}
