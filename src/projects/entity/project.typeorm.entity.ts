import { BaseEntity } from 'src/helpers/base-entity.entity';
import { UserTypeormEntity } from 'src/user/entities/user.typeorm.entity';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';

@Entity({ name: 'projects' })
export class ProjectTypeormEntity extends BaseEntity {
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

  @ManyToMany(() => UserTypeormEntity, (user) => user.projects)
  @JoinTable()
  users: UserTypeormEntity[];
}
