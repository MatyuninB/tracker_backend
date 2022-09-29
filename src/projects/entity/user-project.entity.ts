import { BaseEntity } from 'src/helpers/base-entity.entity';
import { ProjectRoleTypeEnum } from 'src/type/ProjectRoleTypeEnum';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ProjectEntity } from './project.entity';

@Entity({ name: 'user-projects' })
export class UserProjectEntity extends BaseEntity {
  @Column({
    type: 'enum',
    enum: ProjectRoleTypeEnum,
    nullable: false,
  })
  role: ProjectRoleTypeEnum;

  @Column({ nullable: true })
  project_id: number;

  @Column({ nullable: true })
  user_id: number;

  @Column({ nullable: true })
  inviter_id: number;

  @ManyToOne(() => ProjectEntity)
  @JoinColumn({
    name: 'project_id',
  })
  project: ProjectEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'user_id',
  })
  user: UserEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'inviter_id',
  })
  inviter: UserEntity;
}
