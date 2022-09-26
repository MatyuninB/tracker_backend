import { CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryColumn()
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
