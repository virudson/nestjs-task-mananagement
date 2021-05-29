import { TaskStatuses } from '../task.model';

export class SearchTasksDto {
  status?: TaskStatuses;
  search?: string;
}
