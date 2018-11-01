import { Controller, Get, Req } from '@nestjs/common';
import { environment } from '@foretag/server';
import { Request } from 'express';

@Controller()
export class AppController {

  @Get('token')
  getToken(@Req() req: Request) {
    return environment.csrf && req['csrfToken']();
  }

}
