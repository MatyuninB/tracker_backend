import { IsDate, IsIn, IsOptional, IsString } from 'class-validator';
import { TimeState } from '../entities/time.entity';

export class AddTimePointDTO {
  @IsIn(['main'])
  type: 'main';

  @IsIn(['start', 'stop'])
  state: TimeState;

  @IsString()
  time: Date;

  @IsString()
  @IsOptional()
  projectId?: number;

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
