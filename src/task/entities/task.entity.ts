import { UserEntity } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'task' })
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
    unique: true,
  })
  title: string;

  @Column({
    nullable: true,
  })
  description: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
    default: 'now()',
    update: false,
    nullable: false,
  })
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  user: UserEntity;
}
