import { Exclude, Expose, Transform } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatuses } from '../shared/task-statuses';
import { User } from './user.entity';

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

  @ManyToOne(() => User, (user) => user.tasks)
  @Exclude({ toPlainOnly: true })
  user: User;
}
