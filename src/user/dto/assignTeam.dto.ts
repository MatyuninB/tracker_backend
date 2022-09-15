import { UserEntity } from '../entities/user.entity';

export interface AssignTeamDTO {
  userId: number;
  teamId: number;
  user: UserEntity;
}
