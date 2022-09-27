import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/task/entities/task.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { TimePointEntity } from './entities/time-point.entity';

@Injectable()
export class TimePointService {
  constructor(
    @InjectRepository(TimePointEntity)
    private timePointRepository: Repository<TimePointEntity>,
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  async addStartTimepoint(
    user: UserEntity,
    time: Date,
    taskId: number,
    title: string,
    description?: string,
  ) {
    const task = await this.taskRepository.findOneOrFail({
      where: { id: taskId, user: user },
    });

    const timePoint = this.timePointRepository.create();

    timePoint.user = user;
    timePoint.task = task;
    timePoint.title = title;
    timePoint.description = description ? description : null;
    timePoint.start = time;

    await this.timePointRepository.save(timePoint);
  }

  async addStopTimepoint(user: UserEntity, time: Date, taskId: number) {
    const task = await this.taskRepository.findOneOrFail({
      where: { id: taskId, user: user },
    });

    await this.timePointRepository.update(task, { end: time });
  }

  async getUserTimePointsByTaskId(
    user: UserEntity,
    taskId: number,
    startDate?: Date,
    endDate?: Date,
  ): Promise<TimePointEntity[]> {
    const task = await this.taskRepository.findOneOrFail({
      where: { id: taskId, user: user },
    });

    if (startDate && endDate) {
      return await this.timePointRepository.find({
        where: { task, start: startDate, end: endDate },
      });
    } else if (startDate) {
      return await this.timePointRepository.find({
        where: { task, start: startDate },
      });
    } else if (endDate) {
      return await this.timePointRepository.find({
        where: { task, end: endDate },
      });
    }

    return await this.timePointRepository.find({ where: { task } });
  }

  async getTimePoint(
    user: UserEntity,
    timePointId: number,
  ): Promise<TimePointEntity> {
    const timePoint = await this.timePointRepository.findOneOrFail({
      where: { id: timePointId, user },
    });

    return timePoint;
  }

  async updateTimePoint(
    user: UserEntity,
    timePointId: number,
    title?: string,
    description?: string,
    start?: Date,
    end?: Date,
  ): Promise<TimePointEntity> {
    const timePoint = await this.timePointRepository.findOneOrFail({
      where: { id: timePointId, user },
    });

    if (title) {
      timePoint.title = title;
    }

    if (description) {
      timePoint.description = description;
    }
    if (start || end) {
      const taskTimePoints: TimePointEntity[] =
        await this.getUserTimePointsByTaskId(user, timePoint.task.id);

      const timePointIndexInArr = taskTimePoints.findIndex(
        (timePoint) => timePoint.id === timePointId,
      );
      const previousTimePoint: TimePointEntity | undefined =
        taskTimePoints[timePointIndexInArr - 1];

      const nextTimePoint: TimePointEntity | undefined =
        taskTimePoints[timePointIndexInArr + 1];

      /**
       *  start           end   |  start        end   |   start          end
       *    |__предыдущий__|    |    |__текущий__|    |     |__следующий__|
       *
       *                   <--больше (страрше по времени)--
       */
      if (start && end) {
        //Время начала не может быть меньше времени конца
        if (new Date(start) < new Date(end)) {
          throw new BadRequestException(
            'Start time cannot be greater than end time',
          );
        }

        //Время начала и конца не могут быть равны
        if (new Date(start) === new Date(end)) {
          throw new BadRequestException('Start and end times cannot be equal');
        }
      }
      if (start) {
        //Время начала не может быть меньше времени начала следующего time point
        if (nextTimePoint && new Date(start) < new Date(nextTimePoint.start)) {
          throw new BadRequestException(
            'The start time cannot be less than the start time of the next time point',
          );
        }

        //Время начала не может быть больше времени конца предыдущего time point
        if (
          previousTimePoint &&
          new Date(start) > new Date(previousTimePoint.end)
        ) {
          throw new BadRequestException(
            'The start time cannot be greater than the end time of the previous time point',
          );
        }

        timePoint.start = start;
      }
      if (end) {
        //Время конца не может быть меньше времени начала следующего time point
        if (nextTimePoint && new Date(end) < new Date(nextTimePoint.start)) {
          throw new BadRequestException(
            'The end time cannot be less than the start time of the next time point',
          );
        }
        //Время конца не может быть больше времени конца предыдущего time point
        if (
          previousTimePoint &&
          new Date(end) > new Date(previousTimePoint.end)
        ) {
          throw new BadRequestException(
            'The end time cannot be greater than the end time of the previous time point',
          );
        }

        timePoint.end = end;
      }
    }

    return await this.timePointRepository.save(timePoint);
  }
}
