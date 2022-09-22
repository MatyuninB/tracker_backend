import { UserEntity } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

export type TimeState = 'start' | 'stop';

export interface TimePoint {
  type: 'main' | 'sub';
  state: TimeState;
  time: Date;
  description?: string;
  title?: string;
  estimate?: string;
  projectId?: number;
}

@Entity({ name: 'time' })
export class TimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  time: Array<TimePoint>;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
    default: 'now()',
    update: false,
    nullable: false,
  })
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.times)
  user: UserEntity;
}
