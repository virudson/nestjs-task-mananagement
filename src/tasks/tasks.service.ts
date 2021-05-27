import { Injectable } from '@nestjs/common';
import { Task, TaskStatuses } from './task.model';
import { v4 as uuid } from 'uuid';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAll(): Task[] {
    return this.tasks;
  }

  create(title: string, description: string): Task {
    let record: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatuses.TODO,
    };

    this.tasks.push(record);
    return record;
  }
}
