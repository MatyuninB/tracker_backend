import { IsDate, IsIn, IsOptional, IsString } from 'class-validator';
import { TimeState } from '../entities/time.entity.';

export class AddTimePointDTO {
  @IsIn(['main', 'sub'])
  type: 'main' | 'sub';

  @IsIn(['start', 'stop', 'pause', 'sub-start', 'sub-stop'])
  state: TimeState;

  @IsString()
  time: Date;

  @IsString()
  @IsOptional()
  subtask?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  title?: string;
}
