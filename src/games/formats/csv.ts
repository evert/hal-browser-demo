import csvStringify from 'csv-stringify';
import { Game } from '../model'; 

export async function collection(games: Game[]) {

  const data = games.map( game => {
    return [game.name, game.publisher, game.release, game.console.id ];
  });
  return new Promise((res, rej) => {
    csvStringify(
      data,
      {
        header: true,
        columns: ['name', 'publisher', 'release', 'console'],
      },
      (err: any, output: any) => {
        res(output);
      }
    );
  });

}
