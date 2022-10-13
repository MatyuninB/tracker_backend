import UserEntity from 'src/user/entities/user.entity';
import { BaseInterfaceRepository } from 'src/repositories/base/base.interface.repository';

export interface UserRepositoryInterface
  extends BaseInterfaceRepository<UserEntity> {
  findOneByEmail(email: string): Promise<UserEntity | null>;
  findOneWithProjects(id: number): Promise<UserEntity | null>;
}
