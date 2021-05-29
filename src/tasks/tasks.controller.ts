import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Task } from './task.model';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { SearchTasksDto } from './dto/search-tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  index(@Query() searchDto: SearchTasksDto): Task[] {
    if (Object.keys(searchDto).length) {
      return this.taskService.search(searchDto);
    } else {
      return this.taskService.getAll();
    }
  }

  @Get('/:id')
  show(@Param('id') id: string): Task {
    return this.taskService.find(id);
  }

  @Post()
  create(@Body() taskDto: CreateTaskDto): Task {
    return this.taskService.create(taskDto);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() taskDto: UpdateTaskDto): Task {
    return this.taskService.update(id, taskDto);
  }

  @Delete('/:id')
  destroy(@Param('id') id: string): void {
    return this.taskService.destroy(id);
  }
}
