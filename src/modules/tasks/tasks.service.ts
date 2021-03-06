import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatuses } from '../../shared/task-statuses';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { SearchTasksDto } from './dto/search-tasks.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../../models/task.entity';
import { TasksRepository } from 'src/repositories/task.repository';
import { User } from 'src/models/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private taskRepository: TasksRepository,
  ) {}

  async find(id: string, user: User): Promise<Task> {
    const record = await this.taskRepository.findOne({ id, user });

    if (!record) {
      throw new NotFoundException(`Task with ID "${id}" does not exists`);
    }

    return record;
  }

  async getAll(searchDto: SearchTasksDto, user: User): Promise<Task[]> {
    return await this.taskRepository.search(searchDto, user);
  }

  async create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const record = this.taskRepository.create({
      title,
      description,
      status: TaskStatuses.TODO,
      user: user,
    });
    await this.taskRepository.save(record);

    return record;
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<Task> {
    const record = await this.find(id, user);
    record.status = TaskStatuses[updateTaskDto.status];
    await this.taskRepository.save(record);
    return record;
  }

  async destroy(id: string, user: User): Promise<void> {
    const result = await this.taskRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" does not exists`);
    }
  }
}
