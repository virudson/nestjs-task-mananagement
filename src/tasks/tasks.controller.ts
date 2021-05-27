import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  index(): Task[] {
    return this.taskService.getAll();
  }

  @Post()
  create(
    @Body('titile') title: string,
    @Body('description') description: string,
  ): Task {
    return this.taskService.create(title, description);
  }
}
