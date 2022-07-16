import { Injectable } from '@nestjs/common';
import { bot } from './utils/bot';
import { botNovoHinario } from './utils/novo/bot';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

bot.launch();
botNovoHinario.launch();
