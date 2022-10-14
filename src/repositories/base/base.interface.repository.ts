export interface BaseInterfaceRepository<T, E> {
  create(data?: T | any): E;

  findOne(data: any): Promise<E | null>;

  findOneById(id: number): Promise<E | null>;

  findAll(): Promise<E[]>;

  remove(id: string | number): Promise<any>;

  save(data: any): Promise<E>;

  findOneOrFail(data: any): Promise<E>;

  update(data: any, data2: any): Promise<void>;

  find(data: any): Promise<E[]>;
}
