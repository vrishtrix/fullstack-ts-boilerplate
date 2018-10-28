import { Controller, Get, Render, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  @Get('*')
  @Render('index')
  async renderApp(@Req() req: Request, @Res() res: Response) {
    const ip = req.get('x-forwarded-for') || req.connection.remoteAddress;
    // Generate CSRF token, apply to it request headers and store it in Redis
    const someToken = 'whtraver';

    await this.redis.set(`csrf-${ip}`, someToken);

    res.set('X-CSRF-Token', someToken);

    return { req, res };
  }
}
