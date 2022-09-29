import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamRoleTypeEnum } from 'src/type/TeamRoleTypeEnum';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { TeamEntity } from './entity/team.entity';
import { UserTeamEntity } from './entity/user-team.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamEntity)
    private teamRepository: Repository<TeamEntity>,
    @InjectRepository(UserTeamEntity)
    private userTeamRepository: Repository<UserTeamEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createTeam(title: string) {
    const team = await this.teamRepository.findOne({ where: { title } });
    if (team) {
      throw new BadRequestException('A team with the same name already exists');
    }
    return await this.teamRepository.save({ title });
  }

  async addManegerInTeam(
    inviterUser: UserEntity,
    email: string,
    teamId: number,
  ) {
    return await this.addUserInTeam(
      inviterUser,
      email,
      teamId,
      TeamRoleTypeEnum.MANAGER,
    );
  }

  async addRegularUserInTeam(
    inviterUser: UserEntity,
    email: string,
    teamId: number,
  ) {
    return await this.addUserInTeam(
      inviterUser,
      email,
      teamId,
      TeamRoleTypeEnum.USER,
    );
  }

  private async addUserInTeam(
    inviterUser: UserEntity,
    email: string,
    teamId: number,
    role: TeamRoleTypeEnum,
  ) {
    const user = await this.userRepository.findOneOrFail({ where: { email } });

    const team = await this.teamRepository.findOneOrFail({
      where: { id: teamId },
    });

    const userTeamInDb = await this.userTeamRepository.findOne({
      where: { user_id: user.id },
    });

    if (userTeamInDb) {
      throw new BadRequestException('The user is already a member of the team');
    }

    const userTeam = this.userTeamRepository.create();
    userTeam.team = team;
    userTeam.inviter = inviterUser;
    userTeam.role = role;
    userTeam.user = user;

    return await this.userTeamRepository.save(userTeam);
  }

  async deleteUserInTeam(
    user: UserEntity,
    deletedUserId: number,
    teamId: number,
  ) {
    const deletedUserTeam = await this.userTeamRepository.findOneOrFail({
      where: { user_id: deletedUserId, team_id: teamId },
    });

    const userTeam = await this.userTeamRepository.findOneOrFail({
      where: { user_id: user.id, team_id: teamId },
    });

    if (userTeam.role != TeamRoleTypeEnum.MANAGER) {
      throw new BadRequestException('Only the team manager can delete users');
    }

    if (deletedUserTeam.role === TeamRoleTypeEnum.MANAGER) {
      throw new BadRequestException('Manager can only be removed by admin');
    }

    return await this.userTeamRepository.delete(deletedUserTeam.id);
  }

  async getAllTeams() {
    return await this.teamRepository.find({ relations: ['users'] });
  }

  async getTeamWithUsers(teamId = 1) {
    return await this.teamRepository.findOneOrFail({
      relations: ['users'],
      where: { id: teamId },
    });
  }
}
