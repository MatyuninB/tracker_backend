import { BaseEntity } from 'src/helpers/base-entity.entity';
import { TaskTypeormEntity } from 'src/task/entities/task.typeorm.entity';
import { UserTypeormEntity } from 'src/user/entities/user.typeorm.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'time-point' })
export class TimePointTypeormEntity extends BaseEntity {
  @Column({
    length: 100,
    unique: true,
    nullable: false,
  })
  title: string;

  @Column({
    length: 100,
    unique: true,
    nullable: true,
    default: null,
  })
  description: string | null;

  @Column({ type: 'timestamptz', nullable: false })
  start: Date;

  @Column({ type: 'timestamptz', nullable: true, default: null })
  end: Date | null;

  @Column({ nullable: true })
  task_id: number;

  @Column({ nullable: true })
  user_id: number;

  @ManyToOne(() => TaskTypeormEntity)
  @JoinColumn({
    name: 'task_id',
  })
  task: TaskTypeormEntity;

  @ManyToOne(() => UserTypeormEntity)
  @JoinColumn({
    name: 'user_id',
  })
  user: UserTypeormEntity;
}
