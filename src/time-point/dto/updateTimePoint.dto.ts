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
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    type: String,
    example: 'some description',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: Date,
    example: 'some Date',
  })
  @IsString()
  @IsOptional()
  start?: Date;

  @ApiProperty({
    type: Date,
    example: 'some Date',
  })
  @IsString()
  @IsOptional()
  end?: Date;
}
