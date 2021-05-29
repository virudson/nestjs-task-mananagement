import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatuses } from '../task.model';

export class SearchTasksDto {
  @IsEnum(TaskStatuses)
  status?: TaskStatuses;

  @IsNotEmpty()
  search?: string;
}
