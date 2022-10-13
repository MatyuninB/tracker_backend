import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RoleTypeEnum } from 'src/type/RoleTypeEnum';
import { UserDTO } from './dto/user.dto';
import { UserTypeormEntity } from '../entities/typeorm-entities/user.typeorm.entity';
import { UserRepositoryInterface } from './interface/user.repository.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface, // @InjectRepository(TeamTypeormEntity) // private teamRepository: Repository<TeamTypeormEntity>,
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
    return await this.userRepository.findOne({ where: { email } });
  }

  async updateUserRole(userId: number, role: RoleTypeEnum) {
    await this.userRepository.findOneOrFail({
      where: { id: userId },
    });

    return await this.userRepository.update(userId, { role });
  }

  // async assignTeam({ user, teamId, userId }: AssignTeamDTO) {
  //   const team = await this.teamRepository.findOneOrFail({
  //     where: { id: teamId },
  //   });

  //   if (user.role === RoleTypeEnum.MANAGER) {
  //     const userWithTeam = await this.userRepository.findOne({
  //       relations: ['team'],
  //       where: { id: user.id },
  //     });

  //     if (userWithTeam?.team.id !== teamId) {
  //       throw new Error('Manager should be in the same team!');
  //     }
  //   }

  //   await this.userRepository.update(userId, { team });

  //   return `User ${userId} added to team ${team.title}`;
  // }

  async getUserInfo(user: UserTypeormEntity) {
    return await this.userRepository.findOneOrFail({
      relations: ['projects'],
      where: { id: user.id },
    });
  }
}
