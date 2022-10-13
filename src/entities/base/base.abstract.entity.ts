import { BaseEntityInterface } from './base.entity.interface';

export class BaseAbstractEntity implements BaseEntityInterface {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
