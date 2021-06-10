import { User } from 'src/models/user.entity';
import { SearchTasksDto } from 'src/modules/tasks/dto/search-tasks.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Task } from '../models/task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async search(searchDto: SearchTasksDto, user: User): Promise<Task[]> {
    const { status, search } = searchDto;
    const query = this.createQueryBuilder('task');
    query.where({ user });

    if (status) {
      query.where('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        {
          search: `%${search}%`,
        },
      );
    }

    const tasks = await query.getMany();

    return tasks;
  }
}
