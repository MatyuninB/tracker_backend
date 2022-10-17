import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RoleTypeEnum } from 'src/type/RoleTypeEnum';
import { UserDTO } from './dto/user.dto';
import { UserTypeormEntity } from '../entities/typeorm-entities/user.typeorm.entity';
import { UserRepositoryInterface } from './interface/user.repository.interface';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async createUser(data: UserDTO) {
    const user = await this.userRepository.findOneByEmail(data.email);

    if (user) {
      throw new BadRequestException(
        'A user with the same email already exists',
      );
    }

    const userEntity: UserEntity = {
      avatar: data.avatar ? data.avatar : 'undefined',
      name: data.name ? data.name : 'undefined',
      lastName: data.lastName ? data.lastName : 'undefined',
      role: data.role ? data.role : RoleTypeEnum.USER,
      email: data.email,
    };
    return await this.userRepository.save(userEntity);
  }

  async findUserByEmail({ email }) {
    const user = await this.userRepository.findOneByEmail(email);

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    return user;
  }

  async updateUserRole(userId: number, role: RoleTypeEnum) {
    const user = await this.userRepository.findOneById(userId);

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    return await this.userRepository.update(userId, { role });
  }

  async getUserInfo(user: UserTypeormEntity) {
    const userWithProjects = await this.userRepository.findOneWithProjects(
      user.id,
    );

    if (!userWithProjects) {
      throw new BadRequestException('User does not exist');
    }

    return userWithProjects;
  }
}
