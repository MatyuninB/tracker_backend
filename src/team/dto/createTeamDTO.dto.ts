import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDTO {
  @ApiProperty({
    type: String,
    example: 'some title',
  })
  title: string;
}
