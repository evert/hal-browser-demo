import { Context } from '@curveball/core';
import * as gameModel from '../model';
import Controller from '@curveball/controller';
import * as hal from '../formats/hal';
import * as csv from '../formats/csv';

export default class GameCollection extends Controller {

  get(ctx: Context) {

    const wantType = ctx.accepts('application/json', 'application/hal+json', 'text/csv');

    switch (wantType) {
      default:
        return this.getHal(ctx);
      case 'text/csv' :
        return this.getCsv(ctx);
    }

  }

  getHal(ctx: Context) {

    const page = ctx.request.query.page ? parseInt(ctx.request.query.page, 10) - 1 : 0;
    const games = gameModel.getPage(ctx.request.query.q, page);
    ctx.response.type = 'application/hal+json';
    ctx.response.body = hal.collection(
      games.data,
      page,
      games.hasPrevious,
      games.hasNext,
      ctx.request.query.q
    );

  } 

  async getCsv(ctx: Context) {

    ctx.response.type = 'text/csv';
    ctx.response.headers.set(
      'Link', [
        '</games>; rel="alternate"; type="application/hal+json"',
      ]
    );
    ctx.response.headers.set('Title', 'List of video games');

    const games = gameModel.getAll();
    ctx.response.body = await csv.collection(games);

  }

}

