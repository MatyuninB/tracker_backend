import { BaseInterfaceEntity } from './base.interface.entity';

export class BaseAbstractEntity implements BaseInterfaceEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
