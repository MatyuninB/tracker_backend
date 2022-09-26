import { BaseEntity } from 'src/helpers/base-entity.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity({ name: 'team' })
export class TeamEntity extends BaseEntity {
  @Column({
    length: 100,
    unique: true,
  })
  title: string;

  @OneToMany(() => UserEntity, (user) => user.team)
  users: UserEntity[];
}
