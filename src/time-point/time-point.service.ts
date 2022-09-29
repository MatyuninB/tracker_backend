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
      where: { id: taskId, user_id: user.id },
    });

    const timePointInDb = await this.timePointRepository.findOne({
      where: { title },
    });

    //  Если тайм поинт с таким тайтлом уже существует
    if (timePointInDb) {
      throw new BadRequestException('Timepoint with this title already exists');
    }

    const lastUserTimePoint = await this.timePointRepository.findOne({
      order: { end: 'DESC' },
      where: { user_id: user.id },
    });

    //  Если последний тайм поинт ещё не остановлен
    if (!lastUserTimePoint.end) {
      throw new BadRequestException('Last time point not stopped');
    }

    //  Тайм поинт не может быть старше прошлого таймпоинта
    if (lastUserTimePoint && new Date(time) < new Date(lastUserTimePoint.end)) {
      throw new BadRequestException(
        'Time point cannot be earlier than the past',
      );
    }

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
      where: { id: taskId, user_id: user.id },
    });

    const lastUserTimePoint = await this.timePointRepository.findOne({
      order: { end: 'DESC' },
      where: { user_id: user.id },
    });

    const lastTaskTimePoint = await this.timePointRepository.findOne({
      order: { end: 'DESC' },
      where: { user_id: user.id, task_id: task.id },
    });

    //  Если последний тайм поинт в таске уже остановлен
    if (lastTaskTimePoint.end) {
      throw new BadRequestException('Time point has been stopped');
    }

    //  Дата окончания временной точки не может быть раньше даты начала прошлой
    if (new Date(lastUserTimePoint.start) < new Date(time)) {
      throw new BadRequestException(
        'The end date of the time point cannot be earlier than the start date of the last',
      );
    }

    await this.timePointRepository.update(lastTaskTimePoint.id, { end: time });
  }

  async getUserTimePoints(
    user: UserEntity,
    startDate?: Date,
    endDate?: Date,
  ): Promise<TimePointEntity[]> {
    if (startDate && endDate) {
      return await this.timePointRepository.find({
        where: { user_id: user.id, start: startDate, end: endDate },
      });
    } else if (startDate) {
      return await this.timePointRepository.find({
        where: { user_id: user.id, start: startDate },
      });
    } else if (endDate) {
      return await this.timePointRepository.find({
        where: { user_id: user.id, end: endDate },
      });
    }

    return await this.timePointRepository.find({
      where: { user_id: user.id },
      order: { start: 'ASC' },
    });
  }

  async getUserTimePointsByTaskId(
    user: UserEntity,
    taskId: number,
    startDate?: Date,
    endDate?: Date,
  ): Promise<TimePointEntity[]> {
    const task = await this.taskRepository.findOneOrFail({
      where: { id: taskId, user_id: user.id },
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

    return await this.timePointRepository.find({
      where: { task_id: task.id },
      order: { start: 'ASC' },
    });
  }

  async getTimePoint(
    user: UserEntity,
    timePointId: number,
  ): Promise<TimePointEntity> {
    const timePoint = await this.timePointRepository.findOneOrFail({
      where: { id: timePointId, user_id: user.id },
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
    const currentTimePoint = await this.timePointRepository.findOneOrFail({
      where: { id: timePointId, user_id: user.id },
    });

    if (title) {
      currentTimePoint.title = title;
    }

    if (description) {
      currentTimePoint.description = description;
    }

    if (start || end) {
      if (!currentTimePoint.end) {
        throw new BadRequestException('The time point hasnt stopped yet.');
      }

      const userTaskTimePoints: TimePointEntity[] =
        await this.timePointRepository.find({ where: { user_id: user.id } });

      const timePointIndexInArr = userTaskTimePoints.findIndex(
        (timePoint) => timePoint.id === timePointId,
      );

      const previousUserTimePoint: TimePointEntity | undefined =
        userTaskTimePoints[timePointIndexInArr - 1];

      const nextUserTimePoint: TimePointEntity | undefined =
        userTaskTimePoints[timePointIndexInArr + 1];

      /**
       *  start           end   |  start        end   |   start          end
       *    |__предыдущий__|    |    |__текущий__|    |     |__следующий__|
       */

      if (start && end) {
        //  Время начала не может быть больше времени конца
        if (new Date(start) > new Date(end)) {
          throw new BadRequestException(
            'Start time cannot be greater than end time',
          );
        }

        //  Время начала и конца не могут быть равны
        if (new Date(start) === new Date(end)) {
          throw new BadRequestException('Start and end times cannot be equal');
        }
      }
      if (start) {
        //  Время начала не может быть больше времени конце текущего time point
        if (new Date(start) > new Date(currentTimePoint.start)) {
          throw new BadRequestException(
            'The start time cannot be greater than the end time of the current time point',
          );
        }

        //  Время начала не может быть меньше времени конца предыдущего time point
        if (
          previousUserTimePoint &&
          new Date(start) < new Date(previousUserTimePoint.end)
        ) {
          throw new BadRequestException(
            'The start time cannot be less than the end time of the previous time point',
          );
        }

        currentTimePoint.start = start;
      }
      if (end) {
        //  Время конца не может быть больше времени начала следующего time point
        if (
          nextUserTimePoint &&
          new Date(end) > new Date(nextUserTimePoint.start)
        ) {
          throw new BadRequestException(
            'The end time cannot be greater than the start time of these points in time',
          );
        }

        //  Время конца не может быть меньше времени начала текущего time point
        if (new Date(end) < new Date(currentTimePoint.start)) {
          throw new BadRequestException(
            'The end time cannot be less than the start time of the current time point',
          );
        }

        currentTimePoint.end = end;
      }
    }

    return await this.timePointRepository.save(currentTimePoint);
  }
}
