import { ApiProperty } from '@nestjs/swagger';

export class IdDto {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  id: number;
}
