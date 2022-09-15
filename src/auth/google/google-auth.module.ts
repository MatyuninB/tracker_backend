import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamEntity } from 'src/team/entity/team.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtAuthModule } from '../jwt/jwt-auth.module';
import { GoogleStrategy } from '../strategies/google.strategy';
import { GoogleController } from './google-auth.controller';
import { GoogleAuthService } from './google-auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, TeamEntity]),
    JwtAuthModule,
    ConfigModule,
  ],
  controllers: [GoogleController],
  providers: [GoogleStrategy, GoogleAuthService, UserService],
})
export class GoogleOauthModule {}
