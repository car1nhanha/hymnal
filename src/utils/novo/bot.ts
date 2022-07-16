import { Telegraf } from 'telegraf';
import { breakNumber } from './conversor';
import hinos from './hinos.json';
require('dotenv').config();

export const botNovoHinario = new Telegraf(process.env.TOKEN_NOVOHINARIO);

// concatena um array de strings
const concat = (array: string[]) => array.join('\n\n');

// função para retornar um número de entrada em emoji

botNovoHinario.start((ctx) => {
  ctx.reply(`
Olá ${ctx.from.first_name}!
Eu sou um bot para te ajudar com o Hinário.
use o comando /help para ajuda
`);
});

botNovoHinario.help((ctx) => {
  ctx.reply(`
Digite o número do hino que deseja.

nota: o hino 587 são 2 hinos.
  `);
});

// reguex para pegar um número até 3 digitos
const regexNumber = /^\d{1,3}$/;

botNovoHinario.hears(regexNumber, (ctx) => {
  const number = ctx.message.text;

  if (number === '587') {
    ctx.reply('Existem dois hinos com esse número', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '587A', callback_data: '587A' },
            { text: '587B', callback_data: '587B' },
          ],
        ],
      },
    });
  } else {
    try {
      const hino = hinos.filter((item) => {
        return item.number === Number(number);
      })[0];

      if (hino) {
        ctx.reply(`
${breakNumber(Number(Number(number)))} - ${hino.title}

${hino.verse}

${concat(hino.hymn)}
`);
      } else {
        ctx.reply('Hino não encontrado');
      }
    } catch (error) {
      ctx.reply('Hino não encontrado');
    }
  }
});

// regex para o padrão 3 digitos e uma letra
const regexNumberLetter = /^\d{1,3}[A-Z]$/;
botNovoHinario.action(regexNumberLetter, (ctx) => {
  const number = ctx.callbackQuery.data;

  const hino = hinos.filter((item) => {
    return item.number === number;
  })[0];

  if (hino) {
    ctx.reply(`5️⃣8️⃣7️⃣ - ${hino.title}

${hino.verse}

${concat(hino.hymn)}
`);
  } else {
    ctx.reply('Hino não encontrado');
  }
});
