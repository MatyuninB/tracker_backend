import { BaseEntity } from 'src/helpers/base-entity.entity';
import { ProjectTypeormEntity } from 'src/projects/entity/project.typeorm.entity';
import { UserTypeormEntity } from 'src/user/entities/user.typeorm.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'task' })
export class TaskTypeormEntity extends BaseEntity {
  @Column({
    length: 100,
    unique: true,
  })
  title: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({ nullable: true })
  user_id: number;

  @Column({ nullable: true })
  project_id: number;

  @ManyToOne(() => UserTypeormEntity)
  @JoinColumn({
    name: 'user_id',
  })
  user: UserTypeormEntity;

  @ManyToOne(() => ProjectTypeormEntity)
  @JoinColumn({
    name: 'project_id',
  })
  project: ProjectTypeormEntity;
}
