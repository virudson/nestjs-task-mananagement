import { IsEnum } from 'class-validator';
import { TaskStatuses } from '../task-statuses';

export class UpdateTaskDto {
  @IsEnum(TaskStatuses)
  status: string;
}
