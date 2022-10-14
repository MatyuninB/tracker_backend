import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectTypeormEntity } from 'src/entities/typeorm-entities/project.typeorm.entity';
import { UserTypeormEntity } from 'src/entities/typeorm-entities/user.typeorm.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTypeormEntity, ProjectTypeormEntity]),
  ],
  controllers: [ProjectsController],
  providers: [
    ProjectsService,
    {
      provide: 'ProjectRepositoryInterface',
      useClass: ProjectTypeormEntity,
    },
    {
      provide: 'UserRepositoryInterface',
      useClass: UserTypeormEntity,
    },
  ],
})
export class ProjectsModule {}
