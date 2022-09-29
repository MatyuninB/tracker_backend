import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetTimePointsByTaskDTO {
  @ApiProperty({
    type: Date,
    example: '2022-09-28 12:40:41.699151+00',
    required: false,
  })
  @IsOptional()
  @IsString()
  start?: Date;

  @ApiProperty({
    type: Date,
    example: '2022-09-28 12:40:41.699151+00',
    required: false,
  })
  @IsOptional()
  @IsString()
  end?: Date;
}
