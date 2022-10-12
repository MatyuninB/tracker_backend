import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTypeormEntity } from 'src/user/entities/user.typeorm.entity';
import { UserRepositoryInterface } from 'src/user/interface/user.repository.interface';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base.typeorm.abstract.repository';

@Injectable()
export class UserTypeormRepository
  extends BaseAbstractRepository<UserTypeormEntity>
  implements UserRepositoryInterface
{
  constructor(
    @InjectRepository(UserTypeormEntity)
    private readonly userRepository: Repository<UserTypeormEntity>,
  ) {
    super(userRepository);
  }
  async findByEmail(email: string): Promise<UserTypeormEntity> {
    return await this.userRepository.findOne({ where: { email } });
  }
}
