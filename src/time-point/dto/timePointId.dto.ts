import { ApiProperty } from '@nestjs/swagger';

export class TimePointIdDto {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  timePointId: number;
}
