import { IsNumber, IsString } from 'class-validator';

export class AddStopTimePointDTO {
  @IsString()
  time: Date;

  @IsNumber()
  taskId: number;
}
