import { BaseTypeormEntity } from 'src/entities/typeorm-entities/base.typeorm.entity';
import { TaskTypeormEntity } from 'src/entities/typeorm-entities/task.typeorm.entity';
import { TimePointEntityDb } from 'src/time-point/entities/time-point.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserTypeormEntity } from './user.typeorm.entity';

@Entity({ name: 'time-point' })
export class TimePointTypeormEntity
  extends BaseTypeormEntity
  implements TimePointEntityDb
{
  @Column({
    length: 100,
    unique: true,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'varchar',
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
