import { IsNumber } from 'class-validator';

export class AssignUserDTO {
  @IsNumber()
  userId: number;

  @IsNumber()
  projectId: number;
}
