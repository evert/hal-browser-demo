import app from './app';
import fs from 'fs';
import http2 from 'http2';

app.listen(4000);
// tslint:disable
console.log('HTTP/1.1 Listener on port 4000');
const server = http2.createSecureServer({
  key: fs.readFileSync('localhost.key'),
  cert: fs.readFileSync('localhost.crt')
}, app.callback());

server.listen(4443);
// tslint:disable
console.log('HTTP/2 Listener on port 4443');
