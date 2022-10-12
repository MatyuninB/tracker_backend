import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeormEntity } from './entities/user.typeorm.entity';
import { TeamTypeormEntity } from 'src/team/entity/team.typeorm.entity';
import { UserTypeormRepository } from 'src/repositories/typeorm-repositories/user.typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeormEntity, TeamTypeormEntity])],
  providers: [
    UserService,
    {
      provide: 'UserRepositoryInterface',
      useClass: UserTypeormRepository,
    },
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
