import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskEntity } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { ProjectEntity } from 'src/projects/entity/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, UserEntity, ProjectEntity])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
