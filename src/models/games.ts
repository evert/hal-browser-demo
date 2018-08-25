import * as consoles from './consoles';
import parse from 'csv-parse/lib/sync'
import fs from 'fs';

export type Game = {
  id: number, 
  name: string,
  release: number,
  publisher: number,
  console: consoles.Console
}

const data: Game[] = [];
let id = 1;

for(const console of consoles.getAll()) {

  const result = parse(fs.readFileSync(__dirname + '/../../data/' + console.id + '.csv', 'utf-8'));
  for(let ii = 1; ii < result.length; ii++) {
    data.push({
      id: id++,
      name: result[ii][0],
      release: result[ii][2],
      publisher: result[ii][1],
      console: console,
    });
  }

}

export function getAll() {
  return data;
}
export function getPage(q: string|null, startPage: number = 0) {

  let list:Game[] = [];
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
  }
}

export function getById(id: number) {

  return data.find( row => row.id === id);

}
