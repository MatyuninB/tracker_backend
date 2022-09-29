import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AddStartTimePointDTO {
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

  @ApiProperty({
    type: String,
    example: 'some description',
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
