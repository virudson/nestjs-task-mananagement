import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { SearchTasksDto } from './dto/search-tasks.dto';
import { Task } from '../../models/task.entity';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/current-user.decorator';
import { User } from 'src/models/user.entity';
import { TaskSerializer } from 'src/serializers/task-serializer';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  index(
    @Query() searchDto: SearchTasksDto,
    @CurrentUser() currentUser: User,
  ): Promise<Task[]> {
    return this.taskService.getAll(searchDto, currentUser);
  }

  @Get('/:id')
  show(
    @Param('id') id: string,
    @CurrentUser() currentUser: User,
  ): Promise<Task> {
    return this.taskService.find(id, currentUser);
  }

  @Post()
  create(
    @Body() taskDto: CreateTaskDto,
    @CurrentUser() currentUser: User,
  ): Promise<Task> {
    return this.taskService.create(taskDto, currentUser);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() taskDto: UpdateTaskDto,
    @CurrentUser() currentUser: User,
  ): Promise<Task> {
    return this.taskService.update(id, taskDto, currentUser);
  }

  @Delete('/:id')
  destroy(
    @Param('id') id: string,
    @CurrentUser() currentUser: User,
  ): Promise<void> {
    return this.taskService.destroy(id, currentUser);
  }
}
