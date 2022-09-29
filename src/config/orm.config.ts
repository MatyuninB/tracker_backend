import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { config } from 'dotenv';
import { TaskEntity } from 'src/task/entities/task.entity';
import { TeamEntity } from 'src/team/entity/team.entity';
import { TimePointEntity } from 'src/time-point/entities/time-point.entity';
import { UserEntity } from 'src/user/entities/user.entity';

config();

const SSL = process.env.SLL_REJECT_UNAUTHORIZED
  ? {
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }
  : {};

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  // host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [UserEntity, TeamEntity, TimePointEntity, TaskEntity],
  synchronize: true,
  autoLoadEntities: true,
  ...SSL,
};

export const OrmConfig = {
  ...typeOrmModuleOptions,
};
export default OrmConfig;
