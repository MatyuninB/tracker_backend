import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AddStartTimePointDTO {
  @IsString()
  time: Date;

  @IsNumber()
  taskId: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  title: string;
}
