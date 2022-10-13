import UserEntity from 'src/user/entities/user.entity';
import { BaseInterfaceRepository } from './base/base.interface.repository';

export class UserRepository implements BaseInterfaceRepository<UserEntity> {
  create(data?: any): UserEntity {
    throw new Error('Method not implemented.');
  }
  findOne(data: any): Promise<UserEntity | null> {
    throw new Error('Method not implemented.');
  }
  findOneById(id: number): Promise<UserEntity | null> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }
  remove(id: string | number): Promise<any> {
    throw new Error('Method not implemented.');
  }
  save(data: any): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }
  findOneOrFail(data: any): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }
  update(data: any, data2: any): Promise<void> {
    throw new Error('Method not implemented.');
  }
  find(data: any): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }
}
