import { Application } from '@curveball/core';
import router from '@curveball/router';
import halBrowser from 'hal-browser';
import * as consoleController from './documents/consoles';
import * as gameController from './documents/games';
import home from './documents/home';
import form from './documents/form';

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
app.use(router('/form', form));

app.listen(4000);

// tslint:disable
console.log('Listening on port 4000');
