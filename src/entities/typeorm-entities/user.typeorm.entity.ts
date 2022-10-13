import { BaseTypeormEntity } from 'src/entities/typeorm-entities/base.typeorm.entity';
import { ProjectTypeormEntity } from 'src/entities/typeorm-entities/project.typeorm.entity';
import { TaskTypeormEntity } from 'src/entities/typeorm-entities/task.typeorm.entity';
import { TimePointTypeormEntity } from 'src/entities/typeorm-entities/time-point.typeorm.entity';
import { RoleTypeEnum } from 'src/type/RoleTypeEnum';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

@Entity({ name: 'user' })
export class UserTypeormEntity extends BaseTypeormEntity {
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

  @OneToMany(() => TaskTypeormEntity, (task) => task.user)
  tasks: TaskTypeormEntity[];

  @ManyToMany(() => ProjectTypeormEntity, (project) => project.users)
  @JoinTable()
  projects: ProjectTypeormEntity[];

  @OneToMany(() => TimePointTypeormEntity, (time) => time.user)
  times: TimePointTypeormEntity[];
}
