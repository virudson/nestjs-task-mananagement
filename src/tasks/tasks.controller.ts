import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Task } from './task.model';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  index(): Task[] {
    return this.taskService.getAll();
  }

  @Get('/:id')
  show(@Param('id') id: string): Task {
    return this.taskService.find(id);
  }

  @Post()
  create(@Body() taskDto: CreateTaskDto): Task {
    return this.taskService.create(taskDto);
  }
}
