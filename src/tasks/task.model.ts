export enum TaskStatuses {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatuses
}
