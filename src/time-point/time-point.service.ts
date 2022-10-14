import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { TaskRepositoryInterface } from 'src/task/interface/task.repository.interface';
import { UserTypeormEntity } from 'src/entities/typeorm-entities/user.typeorm.entity';
import { TimePointTypeormEntity } from '../entities/typeorm-entities/time-point.typeorm.entity';
import { TimePointRepositoryInterface } from './interface/timepoint.repository.interface';

@Injectable()
export class TimePointService {
  constructor(
    @Inject('TimePointRepositoryInterface')
    private readonly timePointRepository: TimePointRepositoryInterface,
    @Inject('TaskRepositoryInterface')
    private readonly taskRepository: TaskRepositoryInterface,
  ) {}

  async addStartTimepoint(
    user: UserTypeormEntity,
    time: Date,
    taskId: number,
    title: string,
    description?: string,
  ) {
    const task = await this.taskRepository.findOneById(taskId);
    if (!task) {
      throw new BadRequestException(); // TODO
    }

    if (task.user_id != user.id) {
      //Что то сделать!
    }

    const timePointInDb = await this.timePointRepository.findByTitle(title);

    //  Если тайм поинт с таким тайтлом уже существует
    if (timePointInDb) {
      throw new BadRequestException('Timepoint with this title already exists');
    }

    const lastUserTimePoint =
      await this.timePointRepository.findLastUserTimePoint(user.id);

    if (!lastUserTimePoint) {
      throw new BadRequestException(); // TODO
    }

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

  async addStopTimepoint(user: UserTypeormEntity, time: Date, taskId: number) {
    const task = await this.taskRepository.findOneById(taskId);
    if (!task) {
      throw new BadRequestException(); // TODO
    }

    if (task.user_id != user.id) {
      //Что то сделать!
    }

    const lastUserTimePoint =
      await this.timePointRepository.findLastUserTimePoint(user.id);
    if (!lastUserTimePoint) {
      throw new BadRequestException(); // TODO
    }

    const lastTaskTimePoint =
      await this.timePointRepository.findLastUserTaskTimePoint(
        user.id,
        task.id,
      );
    if (!lastTaskTimePoint) {
      throw new BadRequestException(); // TODO
    }

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
    user: UserTypeormEntity,
    startDate?: Date,
    endDate?: Date,
  ) {
    return await this.timePointRepository.findUserTimePoints(
      user.id,
      startDate,
      endDate,
    );
  }

  async getUserTimePointsByTaskId(
    user: UserTypeormEntity,
    taskId: number,
    startDate?: Date,
    endDate?: Date,
  ) {
    const task = await this.taskRepository.findOneById(taskId);
    if (!task) {
      throw new BadRequestException(); // TODO
    }

    if (task.user_id != user.id) {
      //Что то сделать!
    }

    return await this.timePointRepository.findTimePointsByTaskId(
      task.id,
      startDate,
      endDate,
    );
  }

  async getTimePoint(user: UserTypeormEntity, timePointId: number) {
    const timePoint = await this.timePointRepository.findOneOrFail({
      where: { id: timePointId, user_id: user.id },
    });

    return timePoint;
  }

  async updateTimePoint(
    user: UserTypeormEntity,
    timePointId: number,
    title?: string,
    description?: string,
    start?: Date,
    end?: Date,
  ) {
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

      const userTaskTimePoints = await this.timePointRepository.find({
        where: { user_id: user.id },
      });

      const timePointIndexInArr = userTaskTimePoints.findIndex(
        (timePoint) => timePoint.id === timePointId,
      );

      const previousUserTimePoint = userTaskTimePoints[timePointIndexInArr - 1];

      const nextUserTimePoint = userTaskTimePoints[timePointIndexInArr + 1];

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
          previousUserTimePoint.end &&
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
