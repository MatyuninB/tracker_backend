import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateTimePointDTO {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsNumber()
  timePointId: number;

  @ApiProperty({
    type: String,
    example: 'some title',
  })
  @IsString()
  title?: string;

  @ApiProperty({
    type: String,
    example: 'some description',
  })
  @IsString()
  description?: string;

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
