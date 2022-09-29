import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTimePointDTO {
  @IsNumber()
  timePointId: number;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  start?: Date;

  @IsString()
  @IsOptional()
  end?: Date;
}
