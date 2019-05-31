import Controller from '@curveball/controller';
import { Context } from '@curveball/core';
import { NotFound } from '@curveball/http-errors';
import fs from 'fs';
import { promisify } from 'util';
import path from 'path';

const exists = promisify(fs.exists);
const readFile = promisify(fs.readFile);

export default class AssetController extends Controller {

  async get(ctx: Context) {

    const fileName:string = ctx.state.params.fileName;
    if (!fileName.match(/^[A-Za-z0-9-_\.]+$/)) {
      // A simple security measure
      throw new NotFound('Unsupported filename');
    }

    const fullFileName = __dirname + '/../../assets/' + fileName;
    console.log('serving asset: %s', fullFileName);

    if (!await exists(fullFileName)) {
      throw new NotFound('File not found');
    }

    const extension = path.extname(fileName).toLowerCase();
    switch(extension) {
      case '.css' :
        ctx.response.type = 'text/css';
        break;
      case '.js' :
        ctx.response.type = 'text/javascript';
        break;
      case '.html' :
        ctx.response.type = 'text/html';
        break;
      default :
        ctx.response.type = 'application/octet-stream';
        break;
    }

    ctx.response.body = await readFile(fullFileName);

  }

}
