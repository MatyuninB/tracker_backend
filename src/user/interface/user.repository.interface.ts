import { BaseInterfaceRepository } from 'src/repositories/base/base.interface.repository';
import { UserEntity, UserEntityDb } from '../entities/user.entity';

export interface UserRepositoryInterface
  extends BaseInterfaceRepository<UserEntity, UserEntityDb> {
  findOneByEmail(email: string): Promise<UserEntityDb | null>;
  findOneWithProjects(id: number): Promise<UserEntityDb | null>;
}
