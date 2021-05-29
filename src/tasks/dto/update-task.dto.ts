import { IsEnum } from 'class-validator';
import { TaskStatuses } from '../task.model';

export class UpdateTaskDto {
  @IsEnum(TaskStatuses)
  status: string;
}
