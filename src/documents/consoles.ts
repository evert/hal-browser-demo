import { Context } from '@curveball/core';
import * as consoleModel from '../models/consoles';

export function collection(ctx: Context) {

  ctx.response.type = 'application/hal+json';
  ctx.response.body = {
    _links: {
      self: { href: '/consoles' },
      item: [],
    },
    title: 'List of video game consoles',
  };
  const consoles = consoleModel.getAll();
  for(const console of consoles) {

    ctx.response.body._links.item.push({
      href: '/consoles/' + console.id,
      title: console.name,
    });

  }

}

export function item(ctx: Context) {

  ctx.response.type = 'application/hal+json';
  const console = consoleModel.getById(ctx.state.params.id);
  ctx.response.body = generateItem(console);

}


function generateItem(console: consoleModel.Console) {

  return {
    _links: {
      self: { href: '/consoles/' + console.id },
      collection: { href: '/consoles' },
    },
    title: console.name,
    release: console.release
  };

}
