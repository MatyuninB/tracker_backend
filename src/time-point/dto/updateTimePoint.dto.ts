import { IsNumber, IsString } from 'class-validator';

export class UpdateTimePointDTO {
  @IsNumber()
  timePointId: number;

  @IsString()
  title?: string;

  @IsString()
  description?: string;

  @IsString()
  start?: Date;

  @IsString()
  end?: Date;
}
