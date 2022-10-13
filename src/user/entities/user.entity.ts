import { BaseAbstractEntity } from 'src/entities/base/base.abstract.entity';
import { RoleTypeEnum } from 'src/type/RoleTypeEnum';
import ProjectEntity from '../../projects/entity/project.entity';
import { TaskEntity } from '../../task/entities/task.entity';
import TimePointEntity from '../../time-point/entities/time-point.entity';

export default class UserEntity extends BaseAbstractEntity {
  name: string;
  lastName: string;
  role: RoleTypeEnum;
  email: string;
  avatar: string;
  tasks: TaskEntity[];
  projects: ProjectEntity[];
  times: TimePointEntity[];
}
