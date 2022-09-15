import { TeamEntity } from 'src/team/entity/team.entity';
import { TimeEntity } from 'src/time/entities/time.entity.';
import { RoleTypeEnum } from 'src/type/RoleTypeEnum';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column({
    name: 'role',
    type: 'enum',
    enum: RoleTypeEnum,
    default: RoleTypeEnum.USER,
  })
  role: RoleTypeEnum;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 50,
    unique: true,
  })
  email: string;

  @Column({ type: 'text', nullable: true })
  avatar: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
    default: 'now()',
    update: false,
    nullable: false,
  })
  createdAt: Date;

  @OneToMany(() => TimeEntity, (time) => time.user)
  times: TimeEntity[];

  @ManyToOne(() => TeamEntity, (team) => team.users)
  team: TeamEntity;
}
