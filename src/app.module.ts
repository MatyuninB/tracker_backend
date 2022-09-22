import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleOauthModule } from './auth/google/google-auth.module';
import { JwtAuthModule } from './auth/jwt/jwt-auth.module';
import { typeOrmModuleOptions } from './config/orm.config';
import { TimeModule } from './time/time.module';
import { UserModule } from './user/user.module';
import { TeamModule } from './team/team.module';
import { GoogleAuthService } from './auth/google/google-auth.service';
import { ProjectsModule } from './projects/projects.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...typeOrmModuleOptions,
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GoogleOauthModule,
    JwtAuthModule,
    TimeModule,
    UserModule,
    TeamModule,
    ProjectsModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService, GoogleAuthService],
})
export class AppModule {}
