import { BaseTypeormEntity } from 'src/entities/typeorm-entities/base.typeorm.entity';
import { ProjectTypeormEntity } from 'src/entities/typeorm-entities/project.typeorm.entity';
import { UserTypeormEntity } from 'src/entities/typeorm-entities/user.typeorm.entity';
import { TaskEntityDb } from 'src/task/entities/task.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'task' })
export class TaskTypeormEntity
  extends BaseTypeormEntity
  implements TaskEntityDb
{
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

  @ManyToOne(() => ProjectTypeormEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'project_id',
  })
  project: ProjectTypeormEntity;
}
