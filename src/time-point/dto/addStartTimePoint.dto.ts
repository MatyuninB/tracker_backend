import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AddStartTimePointDTO {
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

  @ApiProperty({
    type: String,
    example: 'some description',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: String,
    example: 'some title',
  })
  @IsString()
  title: string;
}
