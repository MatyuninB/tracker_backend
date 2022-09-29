import { BaseEntity } from 'src/helpers/base-entity.entity';
import { TeamRoleTypeEnum } from 'src/type/TeamRoleTypeEnum';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TeamEntity } from './team.entity';

@Entity({ name: 'user-team' })
export class UserTeamEntity extends BaseEntity {
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
