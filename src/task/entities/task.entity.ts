import { BaseEntity } from 'src/helpers/base-entity.entity';
import { ProjectEntity } from 'src/projects/entity/project.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'task' })
export class TaskEntity extends BaseEntity {
  @Column({
    length: 100,
    unique: true,
  })
  title: string;

  @Column({
    nullable: true,
  })
  description: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'user_id',
  })
  user: UserEntity;

  @ManyToOne(() => ProjectEntity)
  @JoinColumn({
    name: 'project_id',
  })
  project: ProjectEntity;
}
