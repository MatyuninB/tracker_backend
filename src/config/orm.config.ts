import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { config } from 'dotenv';
import { ProjectTypeormEntity } from 'src/projects/entity/project.typeorm.entity';
import { TaskTypeormEntity } from 'src/task/entities/task.typeorm.entity';
import { TeamTypeormEntity } from 'src/team/entity/team.typeorm.entity';
import { TimePointTypeormEntity } from 'src/time-point/entities/time-point.typeorm.entity';
import { UserTypeormEntity } from 'src/user/entities/user.typeorm.entity';

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
  entities: [
    UserTypeormEntity,
    TeamTypeormEntity,
    TimePointTypeormEntity,
    TaskTypeormEntity,
    ProjectTypeormEntity,
  ],
  synchronize: true,
  autoLoadEntities: false,
  ...SSL,
};

export const OrmConfig = {
  ...typeOrmModuleOptions,
};
export default OrmConfig;
