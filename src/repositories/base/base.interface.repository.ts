export interface BaseInterfaceRepository<T, E> {
  create(data?: T | any): E;

  findOne(data: any): Promise<E | null>;

  findOneById(id: number): Promise<E | null>;

  findAll(): Promise<E[]>;

  remove(id: number | string): Promise<number>;

  save(entity: T): Promise<any>;

  findOneOrFail(data: any): Promise<E>;

  update(data: any, data2: any): Promise<void>;

  find(data: any): Promise<E[]>;
}
