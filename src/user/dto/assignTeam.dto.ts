import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';

export class AssignTeamDTO {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  userId: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  teamId: number;

  user: UserEntity;
}
