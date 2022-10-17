import { pgPool } from 'src/db/pg-db';
import { TaskEntity, TaskEntityDb } from 'src/task/entities/task.entity';
import { TaskRepositoryInterface } from 'src/task/interface/task.repository.interface';

export class TaskRepository implements TaskRepositoryInterface {
  async findOneById(id: number): Promise<TaskEntityDb | null> {
    const request = `SELECT * FROM task WHERE id = $1`;
    const results = (await pgPool.query(request, [id])).rows[0] as TaskEntityDb;
    return results ? results : null;
  }

  async findAll(): Promise<TaskEntityDb[]> {
    const request = `SELECT * FROM task`;
    const results = (await pgPool.query(request)).rows as TaskEntityDb[];
    return results;
  }

  async findManyByUserId(userId: number): Promise<TaskEntityDb[]> {
    const request = `SELECT * FROM task WHERE user_id = $1`;
    const results = (await pgPool.query(request, [userId]))
      .rows as TaskEntityDb[];
    return results;
  }

  async remove(id: number | string): Promise<number> {
    const request = `DELETE FROM task WHERE id = $1`;
    const results = (await pgPool.query(request, [id])).rowCount;
    return results;
  }

  async save(entity: TaskEntity): Promise<any> {
    const request = `INSERT INTO task (title, description, user_id, project_id) VALUES ($1, $2, $3, $4)`;
    const results = (
      await pgPool.query(request, [
        entity.title,
        entity.description,
        entity.user_id,
        entity.project_id,
      ])
    ).rowCount;
    return results;
  }

  findOneByTitle(title: string): Promise<TaskEntityDb | null> {
    throw new Error('Method not implemented.');
  }
  create(data?: any): TaskEntityDb {
    throw new Error('Method not implemented.');
  }
  findOne(data: any): Promise<TaskEntityDb | null> {
    throw new Error('Method not implemented.');
  }

  findOneOrFail(data: any): Promise<TaskEntityDb> {
    throw new Error('Method not implemented.');
  }
  update(data: any, data2: any): Promise<void> {
    throw new Error('Method not implemented.');
  }
  find(data: any): Promise<TaskEntityDb[]> {
    throw new Error('Method not implemented.');
  }
}
