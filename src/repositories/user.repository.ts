import { UserEntity, UserEntityDb } from 'src/user/entities/user.entity';
import { BaseInterfaceRepository } from './base/base.interface.repository';

export class UserRepository
  implements BaseInterfaceRepository<UserEntity, UserEntityDb>
{
  create(data?: any): UserEntityDb {
    throw new Error('Method not implemented.');
  }
  findOne(data: any): Promise<UserEntityDb | null> {
    throw new Error('Method not implemented.');
  }
  findOneById(id: number): Promise<UserEntityDb | null> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<UserEntityDb[]> {
    throw new Error('Method not implemented.');
  }
  remove(id: string | number): Promise<any> {
    throw new Error('Method not implemented.');
  }
  save(data: any): Promise<UserEntityDb> {
    throw new Error('Method not implemented.');
  }
  findOneOrFail(data: any): Promise<UserEntityDb> {
    throw new Error('Method not implemented.');
  }
  update(data: any, data2: any): Promise<void> {
    throw new Error('Method not implemented.');
  }
  find(data: any): Promise<UserEntityDb[]> {
    throw new Error('Method not implemented.');
  }
}
