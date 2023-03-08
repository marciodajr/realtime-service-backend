import { Controller, Get } from '@nestjs/common';

@Controller()
export class MainController {
  @Get()
  health(): string {
    return 'OK';
  }
}
