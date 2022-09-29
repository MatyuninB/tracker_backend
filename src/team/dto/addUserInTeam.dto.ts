import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class AddUserInTeamDTO {
  @ApiProperty({
    type: String,
    example: 'a@a.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: Number,
    example: '1',
  })
  teamId: number;
}
