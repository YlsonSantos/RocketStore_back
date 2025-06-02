import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('mensagem')
  obterMensagem(): string {
    return 'RocketStore';
  }
}
