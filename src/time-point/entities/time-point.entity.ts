import { BaseEntityInterface } from 'src/entities/base/base.entity.interface';
import { TaskEntityDb } from 'src/task/entities/task.entity';
import { UserEntityDb } from 'src/user/entities/user.entity';

interface ITimePointEntity {
  title: string;
  description: string | null;
  start: Date;
  end: Date | null;
  task_id: number;
  user_id: number;
}
interface ITimePointEntityRelations {
  task: TaskEntityDb;
  user: UserEntityDb;
}

interface ITimePointEntityDB
  extends BaseEntityInterface,
    ITimePointEntity,
    ITimePointEntityRelations {}

export class TimePointEntity implements ITimePointEntity {
  title: string;
  description: string | null;
  start: Date;
  end: Date | null;
  task_id: number;
  user_id: number;
}

export class TimePointEntityDb implements ITimePointEntityDB {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string | null;
  start: Date;
  end: Date | null;
  task_id: number;
  user_id: number;
  task: TaskEntityDb;
  user: UserEntityDb;
}
