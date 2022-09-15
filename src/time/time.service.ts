import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { isSameDay } from 'src/helpers/isSameDay';
import { ProjectEntity } from 'src/projects/entity/project.entity';
import { CalculatedTime } from 'src/type/CalculatedTime.type';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { AddTimePointDTO } from './dto/addTimePoint.dto';
import { TimeEntity, TimePoint } from './entities/time.entity.';

@Injectable()
export class TimeService {
  constructor(
    @InjectRepository(TimeEntity)
    private timeRepository: Repository<TimeEntity>,
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>,
  ) {}

  async addTimepoint(user: UserEntity, data: AddTimePointDTO) {
    let currentTime = await this.timeRepository.findOne({
      relations: ['user'],
      where: {
        createdAt: isSameDay(),
        user: {
          id: user.id,
        },
      },
    });

    if (!currentTime) {
      currentTime = await this.timeRepository.save({ user });
    }

    this.validatePoint(data, currentTime);

    currentTime.time.push(data);

    return await this.timeRepository.update(currentTime.id, currentTime);
  }

  async getTimePoints(id?: number, date?: string) {
    const result: TimeEntity & { calculatedTime?: CalculatedTime } =
      await this.timeRepository.findOne({
        relations: ['user'],
        where: {
          createdAt: isSameDay(date),
          user: {
            id,
          },
        },
      });

    result.calculatedTime = this.countTime(result.time);

    return result;
  }

  private validatePoint(point: AddTimePointDTO, currentTime: TimeEntity) {
    const mainPoints = currentTime.time.filter(
      (point) => point.type === 'main',
    );
    const mainLastPoint = mainPoints[mainPoints.length - 1];

    if (point.type === 'main') {
      if (!['start', 'stop'].includes(point.state))
        throw new Error('Wrong type provided!');

      if (
        point.state === mainLastPoint?.state ||
        (!mainLastPoint && point.state === 'stop')
      )
        throw new Error('Wrong state provided!');
    }

    if (point.type === 'sub') {
      if (!point.title) {
        throw new Error('Title required for sub timer!');
      }
      if (!['sub-start', 'sub-stop'].includes(point.state))
        throw new Error('Wrong type provided!');

      const mainPoints = currentTime.time.filter(
        (point) => point.type === 'sub',
      );
      const subLastPoint = mainPoints[mainPoints.length - 1];

      if (
        point.state === subLastPoint?.state ||
        mainLastPoint?.state !== 'start' ||
        (!subLastPoint && point.state === 'sub-stop')
      )
        throw new Error('Wrong state provided!');
    }
  }

  private countTime(points: Array<TimePoint>) {
    return points.reduceRight<CalculatedTime>(
      (acc, e) => {
        if (e.type === 'main') {
          e.state === 'stop'
            ? (acc.buffer = e.time)
            : (acc.total += dayjs(acc.buffer).diff(e.time, 'seconds'));
        }
        if (e.type === 'sub') {
          if (e.state === 'sub-stop') {
            acc.subBuffer = e.time;
          } else {
            acc.subTotal.push({
              time: dayjs(acc.subBuffer).diff(e.time, 'seconds'),
              title: e.title,
            });
          }
        }
        return acc;
      },
      { subTotal: [], total: 0 },
    );
  }

  private async parseProjects(
    points: Array<TimePoint & { project?: ProjectEntity }>,
  ) {
    return await Promise.all(
      points.map(async (point) => {
        if (point.projectId) {
          point.project = await this.projectRepository.findOne({
            where: { id: point.projectId },
          });
        }
        return point;
      }),
    );
  }
}
