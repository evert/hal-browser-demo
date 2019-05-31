import { Game } from '../model';

export function collection(games: Game[], page: number, hasPrevious: boolean, hasNext: boolean, query: string | null) {

  const body:any = {
    _links: {
      self: { href: '/games' },
      item: [],
      search: {
        href: '/games{?q}',
        templated: true,
      },
      alternate: {
        href: '/games',
        type: 'text/csv',
      }
    },
    title: 'List of video games',
  };
  for (const game of games) {

    body._links.item.push({
      href: '/games/' + game.id,
      title: game.name,
    });

    //ctx.response.body._embedded.item.push(generateItem(game));

  }
  const qPart = query ? 'q=' + query + '&' : '';
  if (hasNext) {
    body._links.next = { href: '/games?' + qPart + 'page=' + (page + 2) };
  }
  if (hasPrevious) {
    body._links.previous = { href: '/games?' + qPart + 'page=' + (page) };
  }

  return body;

}

export function item(game: Game) {

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
