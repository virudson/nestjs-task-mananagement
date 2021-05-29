import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatuses } from './task-statuses';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { SearchTasksDto } from './dto/search-tasks.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async find(id: string): Promise<Task> {
    const record = await this.taskRepository.findOne(id);

    if (!record) {
      throw new NotFoundException(`Task with ID "${id}" is not exists`);
    }

    return record;
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const record = this.taskRepository.create({
      title,
      description,
      status: TaskStatuses.TODO,
    });
    await this.taskRepository.save(record);

    return record;
  }

  // getAll(): Task[] {
  //   return this.tasks;
  // }
  // search(searchDto: SearchTasksDto): Task[] {
  //   const { status, search } = searchDto;
  //   let tasks = this.getAll();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       task.title.includes(search) || task.description.includes(search);
  //     });
  //   }
  //   return tasks;
  // }

  // update(id: string, updateTaskDto: UpdateTaskDto): Task {
  //   const record = this.find(id);
  //   record.status = TaskStatuses[updateTaskDto.status];
  //   return record;
  // }
  // destroy(id: string): void {
  //   this.tasks = this.tasks.filter((task) => task.id !== id);
  // }
}
