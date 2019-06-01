import { Context } from '@curveball/core';
import * as gameModel from '../model';
import Controller from '@curveball/controller';
import * as hal from '../formats/hal';

export default class GameItem extends Controller {

  async get(ctx: Context) {

    ctx.response.type = 'application/hal+json';
    const gameId = parseInt(ctx.state.params.id, 10);
    const game = gameModel.getById(gameId);
    ctx.response.body = hal.item(game); 

  }

}
