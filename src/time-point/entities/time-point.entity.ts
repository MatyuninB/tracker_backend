import { BaseEntity } from 'src/helpers/base-entity.entity';
import { TaskEntity } from 'src/task/entities/task.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'time-point' })
export class TimePointEntity extends BaseEntity {
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

  @ManyToOne(() => TaskEntity)
  @JoinColumn({
    name: 'task_id',
  })
  task: TaskEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'user_id',
  })
  user: UserEntity;
}
