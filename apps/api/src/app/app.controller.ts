import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller()
export class AppController {

  @Get('token')
  getToken(@Req() req: Request) {
    return req['csrfToken']();
  }

}
