import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamEntity } from './entity/team.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamEntity)
    private teamRepository: Repository<TeamEntity>,
  ) {}

  async createTeam(title: string) {
    const team = await this.teamRepository.findOne({ where: { title } });
    if (team) {
      throw new BadRequestException('A team with the same name already exists');
    }
    return await this.teamRepository.save({ title });
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
