import { BaseEntity } from 'src/helpers/base-entity.entity';
import { ProjectEntity } from 'src/projects/entity/project.entity';
import { TaskEntity } from 'src/task/entities/task.entity';
import { TeamEntity } from 'src/team/entity/team.entity';
import { TimePointEntity } from 'src/time-point/entities/time-point.entity';
import { RoleTypeEnum } from 'src/type/RoleTypeEnum';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column({
    name: 'role',
    type: 'enum',
    enum: RoleTypeEnum,
    default: RoleTypeEnum.USER,
  })
  role: RoleTypeEnum;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 50,
    unique: true,
  })
  email: string;

  @Column({ type: 'text', nullable: true })
  avatar: string;

  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks: TaskEntity[];

  @ManyToMany(() => ProjectEntity, (project) => project.users)
  @JoinTable()
  projects: ProjectEntity[];

  @OneToMany(() => TimePointEntity, (time) => time.user)
  times: TimePointEntity[];

  @ManyToOne(() => TeamEntity, (team) => team.users)
  team: TeamEntity;
}
