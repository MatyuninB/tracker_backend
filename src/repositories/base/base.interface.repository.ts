export interface BaseInterfaceRepository<T> {
  create(data?: T | any): T;

  findOne(data: any): Promise<T>;

  findOneById(id: number): Promise<T>;

  findAll(): Promise<T[]>;

  remove(id: string | number): Promise<any>;

  save(data: any): Promise<T>;

  findOneOrFail(data: any): Promise<T>;

  update(data: any, data2: any): Promise<T>;

  find(data: any): Promise<T[]>;
}
