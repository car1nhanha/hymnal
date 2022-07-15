import { Injectable } from '@nestjs/common';
import { bot } from './utils/bot';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

bot.launch();
