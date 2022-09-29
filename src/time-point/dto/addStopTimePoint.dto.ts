import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddStopTimePointDTO {
  @ApiProperty({
    type: Date,
    example: 'some Date',
  })
  @IsString()
  time: Date;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsNumber()
  taskId: number;
}
