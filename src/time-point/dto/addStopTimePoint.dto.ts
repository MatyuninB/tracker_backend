import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddStopTimePointDTO {
  @ApiProperty({
    type: Date,
    example: '2022-09-28 12:40:41.699151+00',
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
