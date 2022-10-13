import UserEntity from 'src/user/entities/user.entity';
import { BaseInterfaceRepository } from 'src/repositories/base/base.interface.repository';

export interface UserRepositoryInterface
  extends BaseInterfaceRepository<UserEntity> {
  findByEmail(email: string): Promise<UserEntity>;
}