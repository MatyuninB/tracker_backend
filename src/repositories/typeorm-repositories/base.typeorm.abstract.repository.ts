import { BaseInterfaceRepository } from '../base/base.interface.repository';
import { DeleteResult, ObjectLiteral, Repository } from 'typeorm';

export abstract class BaseAbstractRepository<T extends ObjectLiteral>
  implements BaseInterfaceRepository<T, T>
{
  private entity: Repository<T>;

  protected constructor(entity: Repository<T>) {
    this.entity = entity;
  }
  public create(data?: any): T {
    return this.entity.create();
  }
  public async find(data: any): Promise<T[]> {
    return await this.entity.find(data);
  }
  public async update(data: any, data2: any): Promise<void> {
    await this.entity.update(data, data2);
  }

  public async findOneById(id: number): Promise<T | null> {
    return await this.entity.findOneById(id);
  }

  public async findByCondition(filterCondition: any): Promise<T | null> {
    return await this.entity.findOne({ where: filterCondition });
  }

  public async findWithRelations(relations: any): Promise<T[]> {
    return await this.entity.find(relations);
  }

  public async findAll(): Promise<T[]> {
    return await this.entity.find();
  }

  public async remove(id: string): Promise<DeleteResult> {
    return await this.entity.delete(id);
  }

  public async findOne(data: any): Promise<T | null> {
    return this.entity.findOne(data);
  }

  public async save(data: any): Promise<T> {
    return this.entity.save(data);
  }

  public async findOneOrFail(data: any): Promise<T> {
    return this.entity.findOneOrFail(data);
  }
}
