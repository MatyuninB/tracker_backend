import { BaseTypeormEntity } from 'src/entities/typeorm-entities/base.typeorm.entity';
import { TeamRoleTypeEnum } from 'src/type/TeamRoleTypeEnum';
import { UserTypeormEntity } from 'src/entities/typeorm-entities/user.typeorm.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TeamTypeormEntity } from './team.typeorm.entity';

@Entity({ name: 'user-team' })
export class UserTeamTypeormEntity extends BaseTypeormEntity {
  @Column({
    type: 'enum',
    enum: TeamRoleTypeEnum,
    nullable: false,
  })
  role: TeamRoleTypeEnum;

  @Column({ nullable: true })
  team_id: number;

  @Column({ nullable: true })
  user_id: number;

  @Column({ nullable: true })
  inviter_id: number;

  @ManyToOne(() => TeamTypeormEntity)
  @JoinColumn({
    name: 'team_id',
  })
  team: TeamTypeormEntity;

  @ManyToOne(() => UserTypeormEntity)
  @JoinColumn({
    name: 'user_id',
  })
  user: UserTypeormEntity;

  @ManyToOne(() => UserTypeormEntity)
  @JoinColumn({
    name: 'inviter_id',
  })
  inviter: UserTypeormEntity;
}