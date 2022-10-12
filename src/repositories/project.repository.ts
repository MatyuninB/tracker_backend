import ProjectEntity from 'src/entities/project.entity';
import { BaseInterfaceRepository } from './base/base.interface.repository';

export class ProjectRepository
  implements BaseInterfaceRepository<ProjectEntity>
{
  create(data?: any): ProjectEntity {
    throw new Error('Method not implemented.');
  }
  find(data: any): Promise<ProjectEntity[]> {
    throw new Error('Method not implemented.');
  }
  findOneOrFail(data: any): Promise<ProjectEntity> {
    throw new Error('Method not implemented.');
  }
  update(data: any, data2: any): Promise<ProjectEntity> {
    throw new Error('Method not implemented.');
  }
  findOne(data: any): Promise<ProjectEntity> {
    throw new Error('Method not implemented.');
  }
  findOneById(id: number): Promise<ProjectEntity> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<ProjectEntity[]> {
    throw new Error('Method not implemented.');
  }
  remove(id: string | number): Promise<any> {
    throw new Error('Method not implemented.');
  }
  save(data: any): Promise<ProjectEntity> {
    throw new Error('Method not implemented.');
  }
}
