import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatuses } from '../../../shared/task-statuses';

export class SearchTasksDto {
  status?: TaskStatuses;
  search?: string;
}
