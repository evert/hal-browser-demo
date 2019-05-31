import { Console } from '../model';

export async function collection(consoles: Console[]) {

  const response:any = {
    _links: {
      self: { href: '/consoles' },
      item: [],
    },
    title: 'List of video game consoles',
  };

  for (const vgconsole of consoles) {

    response._links.item.push({
      href: '/consoles/' + vgconsole.id,
      title: vgconsole.name,
    });

  }

  console.log(response);

  return response;

}

export function item(vgconsole: Console) {

  return {
    _links: {
      self: { href: '/consoles/' + vgconsole.id },
      collection: { href: '/consoles' },
    },
    title: vgconsole.name,
    release: vgconsole.release
  };

}
