import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    type: String,
    example: 'some title',
  })
  @IsString()
  title: string;

  @ApiProperty({
    type: String,
    example: 'some description',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsNumber()
  projectId: number;
}
