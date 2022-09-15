import { IsOptional, IsString } from 'class-validator';

export class ProjectDTO {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  picture: string;
}
