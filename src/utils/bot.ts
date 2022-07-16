import { Telegraf } from 'telegraf';
import { breakNumber } from './conversor';
import hinos from './hinos.json';
require('dotenv').config();

export const bot = new Telegraf(process.env.TOKEN_TELEGRAM);

// concatena um array de strings
const concat = (array: string[]) => array.join('\n\n');

// função para retornar um número de entrada em emoji

bot.start((ctx) => {
  ctx.reply(`
Olá ${ctx.from.first_name}!
Eu sou um bot para te ajudar com o Hinário.
`);
});

bot.help((ctx) => {
  ctx.reply(`
Digite o número do hino que deseja.
  `);
});

// reguex para pegar um número até 3 digitos
const regexNumber = /^\d{1,3}$/;

bot.hears(regexNumber, (ctx) => {
  const number = ctx.message.text;
  const hino = hinos[Number(number) - 1];
  if (hino) {
    ctx.reply(`
${breakNumber(Number(Number(number)))} - ${hino.title}

${hino.verse}

${concat(hino.hymn)}
`);
  } else {
    ctx.reply('Hino não encontrado');
  }
});
