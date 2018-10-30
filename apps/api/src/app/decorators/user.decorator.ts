import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((data, [root, args, { req }]) => req.user);