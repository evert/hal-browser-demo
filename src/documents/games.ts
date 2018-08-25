import { Context } from '@curveball/core';
import * as gameModel from '../models/games';

export function collection(ctx: Context) {

  ctx.response.type = 'application/hal+json';
  ctx.response.body = {
    _links: {
      self: { href: '/games' },
      item: [],
      search: {
        href: '/games{?q}',
        templated: true,
      },
      alternate: {
        href: '/games/?format=csv',
        type: 'text/csv',
      }
    },
    title: 'List of video games',
    _embedded: {
      item: []
    },
  };
  const page = ctx.request.query.page ? parseInt(ctx.request.query.page, 10)-1 : 0;
  const games = gameModel.getPage(ctx.request.query.q, page);
  for(const game of games.data) {

    ctx.response.body._links.item.push({
      href: '/games/' + game.id,
      title: game.name,
    });

    ctx.response.body._embedded.item.push(generateItem(game));

  }
  const qPart = ctx.request.query.q ? 'q=' + ctx.request.query.q + '&' : '';
  if (games.hasNext) {
    ctx.response.body._links.next = { href: '/games?' + qPart + 'page=' + (page + 2) };
  }
  if (games.hasPrevious) {
    ctx.response.body._links.previous = { href: '/games?' + qPart + 'page=' + (page) };
  }

}

export function item(ctx: Context) {

  ctx.response.type = 'application/hal+json';
  const game = gameModel.getById(parseInt(ctx.state.params.id, 10));
  ctx.response.body = generateItem(game);

}


function generateItem(game: gameModel.Game) {

  return {
    _links: {
      self: { href: '/games/' + game.id },
      collection: { href: '/games' },
      console: { href: '/console/' + game.console.id },
    },
    title: game.name,
    publisher: game.publisher,
    release: game.release
  };

}
