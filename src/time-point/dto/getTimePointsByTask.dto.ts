import { IsNumber, IsString } from 'class-validator';

export class GetTimePointsByTaskDTO {
  @IsNumber()
  taskId: number;

  @IsString()
  start?: Date;

  @IsString()
  end?: Date;
}
