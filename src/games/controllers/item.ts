import { Context } from '@curveball/core';
import * as gameModel from '../model';
import Controller from '@curveball/controller';
import * as hal from '../formats/hal';

export default class GameItem extends Controller {

  async get(ctx: Context) {

    ctx.response.type = 'application/hal+json';
    const game = gameModel.getById(ctx.state.params.id);
    ctx.response.body = hal.item(game); 

  }

}
