import { Injectable } from '@nestjs/common';
import { Task, TaskStatuses } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { SearchTasksDto } from './dto/search-tasks.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  find(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  getAll(): Task[] {
    return this.tasks;
  }

  search(searchDto: SearchTasksDto): Task[] {
    const { status, search } = searchDto;
    let tasks = this.getAll();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        task.title.includes(search) || task.description.includes(search);
      });
    }

    return tasks;
  }

  create(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const record: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatuses.TODO,
    };

    this.tasks.push(record);
    return record;
  }

  update(id: string, updateTaskDto: UpdateTaskDto): Task {
    const record = this.find(id);
    record.status = TaskStatuses[updateTaskDto.status];

    return record;
  }

  destroy(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
