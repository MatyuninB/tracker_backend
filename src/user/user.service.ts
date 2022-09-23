import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamEntity } from 'src/team/entity/team.entity';
import { RoleTypeEnum } from 'src/type/RoleTypeEnum';
import { Repository } from 'typeorm';
import { AssignTeamDTO } from './dto/assignTeam.dto';
import { UserDTO } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(TeamEntity)
    private teamRepository: Repository<TeamEntity>,
  ) {}

  async createUser(data: UserDTO) {
    const user = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (user) {
      throw new BadRequestException(
        'A user with the same email already exists',
      );
    }
    return await this.userRepository.save(data);
  }

  async findUserByEmail({ email }) {
    return await this.userRepository.findOneOrFail({ where: { email } });
  }

  async updateUserRole(userId: number, role: RoleTypeEnum) {
    await this.userRepository.findOneOrFail({
      where: { id: userId },
    });

    return await this.userRepository.update(userId, { role });
  }

  async assignTeam({ user, teamId, userId }: AssignTeamDTO) {
    const team = await this.teamRepository.findOneOrFail({
      where: { id: teamId },
    });

    if (user.role === RoleTypeEnum.MANAGER) {
      const userWithTeam = await this.userRepository.findOne({
        relations: ['team'],
        where: { id: user.id },
      });

      if (userWithTeam?.team.id !== teamId) {
        throw new Error('Manager should be in the same team!');
      }
    }

    await this.userRepository.update(userId, { team });

    return `User ${userId} added to team ${team.title}`;
  }

  async getUserInfo(user: UserEntity) {
    return await this.userRepository.findOneOrFail({
      relations: ['team', 'projects'],
      where: { id: user.id },
    });
  }
}
