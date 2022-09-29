import { BaseEntity } from 'src/helpers/base-entity.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';

@Entity({ name: 'projects' })
export class ProjectEntity extends BaseEntity {
  @Column({
    length: 100,
    unique: true,
  })
  title: string;

  @Column({
    length: 100,
    nullable: true,
  })
  picture: string;

  @Column({ default: false })
  disabled: boolean;

  @Column({ nullable: true })
  user_id: number;

  @ManyToMany(() => UserEntity, (user) => user.projects)
  @JoinTable()
  users: UserEntity[];
}
