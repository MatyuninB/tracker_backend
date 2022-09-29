import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserInTeamDTO {
  @ApiProperty({
    type: Number,
    example: '1',
  })
  deletedUserId: number;

  @ApiProperty({
    type: Number,
    example: '1',
  })
  teamId: number;
}
