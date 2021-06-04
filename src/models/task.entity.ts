import { title } from 'process';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatuses } from '../shared/task-statuses';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatuses;
}
