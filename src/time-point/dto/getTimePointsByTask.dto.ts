import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class GetTimePointsByTaskDTO {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsNumber()
  taskId: number;

  @ApiProperty({
    type: Date,
    example: 'some Date',
  })
  @IsString()
  start?: Date;

  @ApiProperty({
    type: Date,
    example: 'some Date',
  })
  @IsString()
  end?: Date;
}
