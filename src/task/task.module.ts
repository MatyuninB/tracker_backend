import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskTypeormRepository } from 'src/repositories/typeorm-repositories/task.typeorm.repository';
import { TaskTypeormEntity } from 'src/task/entities/task.typeorm.entity';
import { UserTypeormEntity } from 'src/user/entities/user.typeorm.entity';
import { ProjectTypeormEntity } from 'src/projects/entity/project.typeorm.entity';
import { UserTypeormRepository } from 'src/repositories/typeorm-repositories/user.typeorm.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TaskTypeormEntity,
      UserTypeormEntity,
      ProjectTypeormEntity,
    ]),
  ],
  controllers: [TaskController],
  providers: [
    TaskService,
    {
      provide: 'TaskRepositoryInterface',
      useClass: TaskTypeormRepository,
    },
    {
      provide: 'UserRepositoryInterface',
      useClass: UserTypeormRepository,
    },
    {
      provide: 'ProjectRepositoryInterface',
      useClass: ProjectTypeormEntity,
    },
  ],
})
export class TaskModule {}
