import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { TeamRoleTypeEnum } from 'src/type/TeamRoleTypeEnum';
import { UserTypeormEntity } from 'src/entities/typeorm-entities/user.typeorm.entity';
import { UserRepositoryInterface } from 'src/user/interface/user.repository.interface';
import { TeamRepositoryInterface } from './interface/team.repository.interface';
import { UserTeamRepositoryInterface } from './interface/user-team.repository.interface';

@Injectable()
export class TeamService {
  constructor(
    @Inject('TeamRepositoryInterface')
    private readonly teamRepository: TeamRepositoryInterface,
    @Inject('UserTeamRepositoryInterface')
    private readonly userTeamRepository: UserTeamRepositoryInterface,
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}
  private async addUserInTeam(
    inviterUser: UserTypeormEntity,
    email: string,
    teamId: number,
    role: TeamRoleTypeEnum,
  ) {
    const user = await this.userRepository.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException(); // TODO
    }

    const team = await this.teamRepository.findOneById(teamId);
    if (!team) {
      throw new BadRequestException('Team does not exist');
    }

    const userTeamInDb = await this.userTeamRepository.findOneByUserId(user.id);
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

  async createTeam(title: string) {
    const team = await this.teamRepository.findOneByTitle(title);
    if (team) {
      throw new BadRequestException('A team with the same name already exists');
    }
    return await this.teamRepository.save({ title });
  }

  async addManegerInTeam(
    inviterUser: UserTypeormEntity,
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
    inviterUser: UserTypeormEntity,
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

  async deleteUserInTeam(
    user: UserTypeormEntity,
    deletedUserId: number,
    teamId: number,
  ) {
    const deletedUserTeam = await this.userTeamRepository.findOneById(
      deletedUserId,
    );
    if (!deletedUserTeam) {
      throw new BadRequestException(); // TODO
    }

    if (deletedUserTeam.team_id != teamId) {
      throw new BadRequestException(
        'The user to be deleted is not a member of the team',
      );
    }

    const userTeam = await this.userTeamRepository.findOneById(user.id);
    if (!userTeam) {
      throw new BadRequestException(); // TODO
    }

    if (userTeam.team_id != teamId) {
      throw new BadRequestException('The user is not a member of the team');
    }

    if (userTeam.role != TeamRoleTypeEnum.MANAGER) {
      throw new BadRequestException('Only the team manager can delete users');
    }

    if (deletedUserTeam.role === TeamRoleTypeEnum.MANAGER) {
      throw new BadRequestException('Manager can only be removed by admin');
    }

    return await this.userTeamRepository.remove(deletedUserTeam.id);
  }

  async getAllTeams() {
    return await this.teamRepository.findManyWithUsers();
  }

  async getTeamWithUsers(teamId = 1) {
    const team = await this.teamRepository.findOneByIdWithUsers(teamId);
    if (!team) {
      throw new BadRequestException(); // TODO
    }
    return team;
  }
}
