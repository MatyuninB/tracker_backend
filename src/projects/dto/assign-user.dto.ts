import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AssignUserDTO {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsNumber()
  projectId: number;
}
