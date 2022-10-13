import TeamEntity from 'src/team/entity/team.entity';
import { BaseInterfaceRepository } from './base/base.interface.repository';

export class TeamRepository implements BaseInterfaceRepository<TeamEntity> {
  create(data?: any): TeamEntity {
    throw new Error('Method not implemented.');
  }
  findOne(data: any): Promise<TeamEntity | null> {
    throw new Error('Method not implemented.');
  }
  findOneById(id: number): Promise<TeamEntity | null> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<TeamEntity[]> {
    throw new Error('Method not implemented.');
  }
  remove(id: string | number): Promise<any> {
    throw new Error('Method not implemented.');
  }
  save(data: any): Promise<TeamEntity> {
    throw new Error('Method not implemented.');
  }
  findOneOrFail(data: any): Promise<TeamEntity> {
    throw new Error('Method not implemented.');
  }
  update(data: any, data2: any): Promise<void> {
    throw new Error('Method not implemented.');
  }
  find(data: any): Promise<TeamEntity[]> {
    throw new Error('Method not implemented.');
  }
}
