import { Application } from '@curveball/core';
import halBrowser from 'hal-browser';
import cors from './middleware/cors';
import routes from './routes';

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

app.use(cors());

for(const route of routes) {
  app.use(route);
}

export default app;
