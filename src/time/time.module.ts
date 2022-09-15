import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeEntity } from './entities/time.entity.';
import { TimeController } from './time.controller';
import { TimeService } from './time.service';

@Module({
  imports: [TypeOrmModule.forFeature([TimeEntity])],
  controllers: [TimeController],
  providers: [TimeService],
})
export class TimeModule {}
