import TimePointEntity from 'src/time-point/entities/time-point.entity';
import { BaseInterfaceRepository } from './base/base.interface.repository';

export class TaskRepository
  implements BaseInterfaceRepository<TimePointEntity>
{
  create(data?: any): TimePointEntity {
    throw new Error('Method not implemented.');
  }
  find(data: any): Promise<TimePointEntity[]> {
    throw new Error('Method not implemented.');
  }
  findOneOrFail(data: any): Promise<TimePointEntity> {
    throw new Error('Method not implemented.');
  }
  update(data: any, data2: any): Promise<TimePointEntity> {
    throw new Error('Method not implemented.');
  }
  findOne(data: any): Promise<TimePointEntity> {
    throw new Error('Method not implemented.');
  }
  findOneById(id: number): Promise<TimePointEntity> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<TimePointEntity[]> {
    throw new Error('Method not implemented.');
  }
  remove(id: string | number): Promise<any> {
    throw new Error('Method not implemented.');
  }
  save(data: any): Promise<TimePointEntity> {
    throw new Error('Method not implemented.');
  }
}
