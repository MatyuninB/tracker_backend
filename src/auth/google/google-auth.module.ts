import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeormRepository } from 'src/repositories/typeorm-repositories/user.typeorm.repository';
import { TeamTypeormEntity } from 'src/entities/typeorm-entities/team.typeorm.entity';
import { UserTypeormEntity } from 'src/entities/typeorm-entities/user.typeorm.entity';
import { UserService } from 'src/user/user.service';
import { JwtAuthModule } from '../jwt/jwt-auth.module';
import { GoogleStrategy } from '../strategies/google.strategy';
import { GoogleController } from './google-auth.controller';
import { GoogleAuthService } from './google-auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTypeormEntity, TeamTypeormEntity]),
    JwtAuthModule,
    ConfigModule,
  ],
  controllers: [GoogleController],
  providers: [
    GoogleStrategy,
    GoogleAuthService,
    UserService,
    {
      provide: 'UserRepositoryInterface',
      useClass: UserTypeormRepository,
    },
  ],
})
export class GoogleOauthModule {}
