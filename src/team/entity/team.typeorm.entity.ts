import { BaseEntity } from 'src/helpers/base-entity.entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'team' })
export class TeamTypeormEntity extends BaseEntity {
  @Column({
    length: 100,
    unique: true,
  })
  title: string;

  @Column({
    length: 1000,
    unique: true,
  })
  description: string;
}
