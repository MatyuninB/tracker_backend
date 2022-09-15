import { UserEntity } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity({ name: 'projects' })
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

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

  @ManyToMany(() => UserEntity, (user) => user.projects)
  users: UserEntity[];
}
