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

    const lastTimePoint = await this.timePointRepository.findOne({
      order: { end: 'DESC' },
      where: { user_id: user.id, task_id: taskId },
    });

    //  Тайм поинт не может быть старше прошлого таймпоинта
    if (lastTimePoint && new Date(time) < new Date(lastTimePoint.end)) {
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

    const lastTimePoint = await this.timePointRepository.findOne({
      order: { end: 'DESC' },
      where: { user_id: user.id, task_id: task.id },
    });

    //  Если последний тайм поинт уже остановлен
    if (lastTimePoint.end) {
      throw new BadRequestException('Time point has been stopped');
    }

    //  Дата окончания временной точки не может быть раньше даты начала.
    if (new Date(lastTimePoint.start) < new Date(time)) {
      throw new BadRequestException(
        'The end date of a time point cannot be earlier than the start date',
      );
    }

    await this.timePointRepository.update(lastTimePoint.id, { end: time });
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

      const taskTimePoints: TimePointEntity[] =
        await this.getUserTimePointsByTaskId(user, currentTimePoint.task_id);

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
          previousTimePoint &&
          new Date(start) < new Date(previousTimePoint.end)
        ) {
          throw new BadRequestException(
            'The start time cannot be less than the end time of the previous time point',
          );
        }

        currentTimePoint.start = start;
      }
      if (end) {
        //  Время конца не может быть больше времени начала следующего time point
        if (nextTimePoint && new Date(end) > new Date(nextTimePoint.start)) {
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
