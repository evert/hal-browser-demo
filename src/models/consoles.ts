const data = [
  {
    id: 'nes',
    name: 'Nintendo Entertainment System',
    release: 1983,
  },
  {
    id: 'dmg',
    name: 'Gameboy',
    release: 1989,
  },
  {
    id: 'snes',
    name: 'Super Nintendo',
    release: 1990,
  },
  {
    id: 'n64',
    name: 'Nintendo 64',
    release: 1996,
  },
  {
    id: 'gbc',
    name: 'Nintendo Gamecube',
    release: 2001,
  },
];

export type Console = {
  id: string,
  name: string,
  release: number
};

export function getAll() {
  return data;
}

export function getById(id: string) {

  return data.find( row => row.id === id);

}
