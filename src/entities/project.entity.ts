import { BaseAbstractEntity } from 'src/entities/base/base.abstract.entity';
import UserEntity from './user.entity';

export default class ProjectEntity extends BaseAbstractEntity {
  title: string;
  picture: string;
  disabled: boolean;
  user_id: number;
  users: UserEntity[];
}
