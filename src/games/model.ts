import parse from 'csv-parse/lib/sync';
import fs from 'fs';
import * as consoles from '../consoles/model';

export type Game = {
  id: number,
  name: string,
  release: number,
  publisher: number,
  console: consoles.Console
};

const data: Game[] = [];
let maxId = 1;

for (const vgconsole of consoles.getAll()) {

  const result = parse(fs.readFileSync(__dirname + '/../../data/' + vgconsole.id + '.csv', 'utf-8'));
  for (let ii = 1; ii < result.length; ii++) {
    data.push({
      id: maxId++,
      name: result[ii][0],
      release: result[ii][2],
      publisher: result[ii][1],
      console: vgconsole,
    });
  }

}

export function getAll() {
  return data;
}
export function getPage(q: string|null, startPage: number = 0) {

  let list: Game[] = [];
  if (q) {
    list = data.filter( item => item.name.toLowerCase().includes(q.toLowerCase()) );
  } else {
    list = data;
  }
  const pageSize = 25;
  const page = list.slice(pageSize * startPage, pageSize * (startPage + 1));

  return {
    hasNext: list.length > pageSize * (startPage + 1),
    hasPrevious: startPage > 0,
    data: page,
  };
}

export function getById(id: number) {

  return data.find( row => row.id === id);

}
