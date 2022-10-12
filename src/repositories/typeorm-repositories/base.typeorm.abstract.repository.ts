import { BaseInterfaceRepository } from '../base/base.interface.repository';
import { DeleteResult, Repository } from 'typeorm';

export abstract class BaseAbstractRepository<T>
  implements BaseInterfaceRepository<T>
{
  private entity: Repository<T>;

  protected constructor(entity: Repository<T>) {
    this.entity = entity;
  }
  create(data?: any): T {
    throw new Error('Method not implemented.');
  }
  find(data: any): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  update(data: any, data2: any): Promise<T> {
    throw new Error('Method not implemented.');
  }

  public async findOneById(id: number): Promise<T> {
    return await this.entity.findOneById(id);
  }

  public async findByCondition(filterCondition: any): Promise<T> {
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

  public async findOne(data: any): Promise<T> {
    return this.entity.findOne(data);
  }

  public async save(data: any): Promise<T> {
    return this.entity.save(data);
  }

  public async findOneOrFail(data: any): Promise<T> {
    return this.entity.findOneOrFail(data);
  }
}
