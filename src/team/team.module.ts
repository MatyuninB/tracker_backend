import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamTypeormEntity } from '../entities/typeorm-entities/team.typeorm.entity';
import { UserTeamTypeormEntity } from '../entities/typeorm-entities/user-team.typeorm.entity';
import { UserTypeormEntity } from 'src/entities/typeorm-entities/user.typeorm.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TeamTypeormEntity,
      UserTeamTypeormEntity,
      UserTypeormEntity,
    ]),
  ],
  providers: [
    TeamService,
    {
      provide: 'TeamRepositoryInterface',
      useClass: TeamTypeormEntity,
    },
    {
      provide: 'UserRepositoryInterface',
      useClass: UserTypeormEntity,
    },
    {
      provide: 'UserTeamRepositoryInterface',
      useClass: UserTeamTypeormEntity,
    },
  ],
  controllers: [TeamController],
  exports: [TeamService],
})
export class TeamModule {}
