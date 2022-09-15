import * as dayjs from 'dayjs';
import { Between } from 'typeorm';

export const isSameDay = (date: Date | string = new Date()) =>
  Between(
    dayjs(date).startOf('day').toDate(),
    dayjs(date).endOf('day').toDate(),
  );
