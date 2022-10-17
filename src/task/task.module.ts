import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskTypeormRepository } from 'src/repositories/typeorm-repositories/task.typeorm.repository';
import { TaskTypeormEntity } from 'src/entities/typeorm-entities/task.typeorm.entity';
import { UserTypeormEntity } from 'src/entities/typeorm-entities/user.typeorm.entity';
import { ProjectTypeormEntity } from 'src/entities/typeorm-entities/project.typeorm.entity';
import { UserTypeormRepository } from 'src/repositories/typeorm-repositories/user.typeorm.repository';
import { TaskRepository } from 'src/repositories/task.repository';

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
      useClass: TaskRepository,
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
