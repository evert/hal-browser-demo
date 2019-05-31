import router from '@curveball/router';

import ConsoleCollectionController from './consoles/controllers/collection';
import ConsoleController from './consoles/controllers/item';
import GameCollectionController from './games/controllers/collection';
import GameController from './games/controllers/item';
import form from './documents/form';
import home from './documents/home';

export default [
  router('/', home),
  router('/consoles', new ConsoleCollectionController()),
  router('/consoles/:id', new ConsoleController()),
  router('/games', new GameCollectionController()),
  router('/games/:id', new GameController()),
  router('/form', form),
];
