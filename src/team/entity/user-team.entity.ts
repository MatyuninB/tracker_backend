import { TeamRoleTypeEnum } from 'src/type/TeamRoleTypeEnum';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity';
import { TeamEntity } from './team.entity';

@Entity({ name: 'user-team' })
export class UserTeamEntity extends BaseEntity {
  @Column({
    type: 'enum',
    enum: TeamRoleTypeEnum,
    nullable: false,
  })
  role: TeamRoleTypeEnum;

  @ManyToOne(() => TeamEntity)
  @JoinColumn({
    name: 'team_id',
  })
  team: TeamEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'user_id',
  })
  user: UserEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'inviter_id',
  })
  inviter: UserEntity;
}
