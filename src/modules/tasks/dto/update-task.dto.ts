import { IsEnum } from 'class-validator';
import { TaskStatuses } from '../../../shared/task-statuses';

export class UpdateTaskDto {
  @IsEnum(TaskStatuses)
  status: string;
}
