import { EntityRepository, Repository } from 'typeorm';
import { SearchTasksDto } from './dto/search-tasks.dto';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async search(searchDto: SearchTasksDto): Promise<Task[]> {
    const { status, search } = searchDto;
    const query = this.createQueryBuilder('task');

    if (status) {
      query.where('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        {
          search: `%${search}%`,
        },
      );
    }

    const tasks = await query.getMany();

    return tasks;
  }
}
