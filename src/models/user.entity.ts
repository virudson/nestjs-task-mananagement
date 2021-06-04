import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'encrypted_password' })
  encrptedPassword: string;

  @Column({ name: 'auth_token' })
  token: string;
}
