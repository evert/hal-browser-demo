import { Context } from '@curveball/core';
import * as consoleModel from '../model';
import Controller from '@curveball/controller';
import * as hal from '../formats/hal';

export default class ConsoleCollection extends Controller {

  async get(ctx: Context) {

    ctx.response.type = 'application/hal+json';
    const consoles = consoleModel.getAll();
    ctx.response.body = await hal.collection(consoles); 

    if (ctx.request.headers.has('Prefer-Push') && ctx.request.headers.get('Prefer-Push').split(',').includes('item')) {

      for (const vgconsole of consoles) {

        await ctx.push( (pushCtx: Context) => {
          pushCtx.request.path = '/consoles/' + vgconsole.id;
          pushCtx.response.type = 'application/hal+json';
          pushCtx.response.body = hal.item(vgconsole);
        });

      }
    }

  }

}

