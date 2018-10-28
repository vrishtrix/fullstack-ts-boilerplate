import { ExecutionContext, CanActivate, Injectable, BadRequestException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class CsrfTokenGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const ip = req.get('x-forwarded-for') || req.connection.remoteAddress;
    const csrfToken = req.get('X-CSRF-Token');

    if (!csrfToken) {
      throw new BadRequestException('No "X-CSRF-Token" token provided');
    }

    try {
      const token = await this.redis.get(`csrf-${ip}`);
      return true;
    } catch (e) {
      throw new BadRequestException(`No "X-CSRF-Token" exists for IP: ${ip}`);
    }
  }
}
