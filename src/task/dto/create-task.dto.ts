import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  projectId: number;
}
