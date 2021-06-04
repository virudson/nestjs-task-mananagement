import { NotFoundException } from '@nestjs/common';
import { User } from 'src/models/user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async findByEmail(email: string): Promise<User> {
    const user = await this.findOne({ email: email });

    if (!user) {
      throw new NotFoundException(`User with email "${email}" does not exists`);
    }

    return user;
  }
}
