import { Context } from '@curveball/core';
import * as consoleModel from '../model';
import Controller from '@curveball/controller';
import * as hal from '../formats/hal';

export default class ConsoleItem extends Controller {

  async get(ctx: Context) {

    ctx.response.type = 'application/hal+json';
    const console = consoleModel.getById(ctx.state.params.id);
    ctx.response.body = hal.item(console); 

  }

}
