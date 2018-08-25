import { Context } from '@curveball/core';
import * as gameModel from '../models/games';
import csvStringify from 'csv-stringify';

export function collection(ctx: Context) {

  if (ctx.request.query.format === 'csv') {
    return csvCollection(ctx);
  } else {
    return halCollection(ctx);
  }

}

function halCollection(ctx: Context) {

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

async function csvCollection(ctx: Context) {

  ctx.response.type = 'text/csv';
  ctx.response.headers.set(
    'Link', [ 
      '</games>; rel="alternate"; type="application/hal+json"',
    ]
  );
  ctx.response.headers.set('Title', 'List of video games');

  const data = gameModel.getAll().map( game => {
    return [game.name, game.publisher, game.release, game.console.id ];
  });
  await new Promise((res, rej) => {
    csvStringify(
      data,
      {
        header: true,
        columns: ['name', 'publisher', 'release', 'console'],
      },
      (err: any, output: any) => {
        ctx.response.body = output;
        res();
      }
    );
  });

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
      console: { href: '/consoles/' + game.console.id, title: game.console.name },
    },
    title: game.name,
    publisher: game.publisher,
    release: game.release
  };

}
