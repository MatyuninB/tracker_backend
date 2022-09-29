import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ProjectDTO {
  @ApiProperty({
    type: String,
    example: 'some title',
  })
  @IsString()
  title: string;

  @ApiProperty({
    type: String,
    example: 'some picture',
  })
  @IsString()
  @IsOptional()
  picture: string;
}
