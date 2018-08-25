import { Application } from '@curveball/core';
import router from '@curveball/router';
import home from './documents/home';
import * as consoleController from './documents/consoles';
import * as gameController from './documents/games';
import halBrowser from 'hal-browser';

const app = new Application();

app.use(halBrowser({
  defaultLinks: [
    {
      rel: 'home',
      href: '/',
    },
    {
      rel: 'code-repository',
      href: 'https://github.com/evert/hal-browser-demo',
    }
  ]
}));
app.use(router('/', home));
app.use(router('/games', gameController.collection));
app.use(router('/games/:id', gameController.item));
app.use(router('/consoles', consoleController.collection));
app.use(router('/consoles/:id', consoleController.item));

app.listen(4000);
console.log('Listening on port 4000');
