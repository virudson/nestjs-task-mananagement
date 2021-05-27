import { Injectable } from '@nestjs/common';
import { Task, TaskStatuses } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  find(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  getAll(): Task[] {
    return this.tasks;
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

  destroy(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
