import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { isSameDay } from 'src/helpers/isSameDay';
import { ProjectEntity } from 'src/projects/entity/project.entity';
import { CalculatedTime } from 'src/type/CalculatedTime.type';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { AddTimePointDTO } from './dto/addTimePoint.dto';
import { TimeEntity, TimePoint } from './entities/time.entity';

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
        createdAt: isSameDay(data.time),
        user: {
          id: user.id,
        },
      },
    });

    if (!currentTime) {
      currentTime = await this.timeRepository.save({
        user,
        currentTime: data.time,
      });
    }

    this.validatePoint(data, currentTime);

    currentTime.time.push(data);

    return await this.timeRepository.update(currentTime.id, currentTime);
  }

  async getTimePoints(id?: number, date?: string) {
    const result: TimeEntity & {
      calculatedTime?: CalculatedTime;
      status?: boolean;
    } = await this.timeRepository.findOne({
      relations: ['user'],
      where: {
        createdAt: isSameDay(date),
        user: {
          id,
        },
      },
    });

    if (!result) return { status: false };
    result.calculatedTime = this.countTime(result.time);
    result.status = true;
    return result;
  }

  private validatePoint(point: AddTimePointDTO, currentTime: TimeEntity) {
    const mainPoints = currentTime.time.filter(
      (point) => point.type === 'main',
    );
    const mainLastPoint = mainPoints[mainPoints.length - 1];

    if (
      point.state === mainLastPoint?.state ||
      (!mainLastPoint && point.state === 'stop')
    )
      throw new Error('Wrong state provided!');

    if (!point.title) {
      throw new Error('Title required for timer!');
    }
  }

  private countTime(points: Array<TimePoint>) {
    const pointsMap = points.reduceRight<
      Map<string, { time?: number; buffer?: Date | string }>
    >((acc, e) => {
      const current = acc.get(e.title) || { time: 0, buffer: '' };

      if (e.state === 'stop') {
        current.buffer = e.time;
        acc.set(e.title, current);
      } else {
        const trackerTime = dayjs(current?.buffer).diff(e.time) || 0;

        current.time = current.time += trackerTime;
        current.buffer = '';
        acc.set(e.title, current);
      }
      return acc;
    }, new Map());

    const responce: {
      total: number;
      timers: Array<{ title: string; time: number }>;
    } = {
      total: 0,
      timers: [],
    };

    pointsMap.forEach(({ time }, k) => {
      responce.timers.push({
        title: k,
        time,
      });
      responce.total = responce.total += time;
    });
    return responce;
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
