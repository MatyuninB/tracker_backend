import { BaseTypeormEntity } from 'src/entities/typeorm-entities/base.typeorm.entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'team' })
export class TeamTypeormEntity extends BaseTypeormEntity {
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
