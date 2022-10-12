import { BaseAbstractEntity } from 'src/entities/base/base.abstract.entity';
import { TaskEntity } from './task.entity';
import UserEntity from './user.entity';

export default class TimePointEntity extends BaseAbstractEntity {
  title: string;
  description: string | null;
  start: Date;
  end: Date | null;
  task_id: number;
  user_id: number;
  task: TaskEntity;
  user: UserEntity;
}
