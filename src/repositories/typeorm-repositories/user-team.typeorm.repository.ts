import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTeamTypeormEntity } from 'src/entities/typeorm-entities/user-team.typeorm.entity';
import { UserTeamRepositoryInterface } from 'src/team/interface/user-team.repository.interface';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base.typeorm.abstract.repository';

@Injectable()
export class UserTeamTypeormRepository
  extends BaseAbstractRepository<UserTeamTypeormEntity>
  implements UserTeamRepositoryInterface
{
  constructor(
    @InjectRepository(UserTeamTypeormEntity)
    private readonly userTeamRepository: Repository<UserTeamTypeormEntity>,
  ) {
    super(userTeamRepository);
  }
  async findOneByUserId(userId: number): Promise<UserTeamTypeormEntity | null> {
    return await this.userTeamRepository.findOne({
      where: { user_id: userId },
    });
  }
}
