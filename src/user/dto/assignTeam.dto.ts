import { ApiProperty } from '@nestjs/swagger';
import { UserTypeormEntity } from '../entities/user.typeorm.entity';

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

  user: UserTypeormEntity;
}
