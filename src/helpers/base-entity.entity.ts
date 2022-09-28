import {
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
  })
  updatedAt: Date;
}
