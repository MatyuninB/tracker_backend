import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamTypeormEntity } from 'src/entities/typeorm-entities/team.typeorm.entity';
import { TeamRepositoryInterface } from 'src/team/interface/team.repository.interface';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base.typeorm.abstract.repository';

@Injectable()
export class TeamTypeormRepository
  extends BaseAbstractRepository<TeamTypeormEntity>
  implements TeamRepositoryInterface
{
  constructor(
    @InjectRepository(TeamTypeormEntity)
    private readonly teamRepository: Repository<TeamTypeormEntity>,
  ) {
    super(teamRepository);
  }

  async findManyWithUsers(): Promise<TeamTypeormEntity[]> {
    return await this.teamRepository.find({ relations: ['users'] });
  }

  async findOneByIdWithUsers(id: number): Promise<TeamTypeormEntity | null> {
    return await this.teamRepository.findOneOrFail({
      relations: ['users'],
      where: { id },
    });
  }

  async findOneByTitle(title: string): Promise<TeamTypeormEntity | null> {
    return await this.teamRepository.findOne({ where: { title } });
  }
}
