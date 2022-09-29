import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

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
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    type: String,
    example: 'some description',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: Date,
    example: '2022-09-28 12:40:41.699151+00',
    required: false,
  })
  @IsString()
  @IsOptional()
  start?: Date;

  @ApiProperty({
    type: Date,
    example: '2022-09-28 12:40:41.699151+00',
    required: false,
  })
  @IsString()
  @IsOptional()
  end?: Date;
}
