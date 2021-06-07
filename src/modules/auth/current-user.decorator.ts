import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/models/user.entity';

export const CurrentUser = createParamDecorator(
  (_data, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
