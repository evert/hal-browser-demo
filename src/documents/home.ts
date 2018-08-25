import { Context } from '@curveball/core';

export default function (ctx: Context) {

  const browserVersion = require('hal-browser/package.json').version;

  ctx.response.headers.set(
    'Link',
    [
      '</games>; rel="games"; title="List of video games"',
      '</consoles>; rel="consoles"; title="List of video game consoles"',
      '<https://evertpot.com>; rel="author"; title="Author"',
    ]
  );

  ctx.response.type = 'text/markdown';
  ctx.response.body =
`HAL Browser
===========

You're looking at a live demo of [hal-browser][1].

The HAL-Browser is a tool written in TypeScript that can sit in front of a
HAL API and automatically turn HAL responses in an easy-to-use web interface.

It does so by inspecting the \`Accept\` header to see if the client requested
\`text/html\`.

It automatically converts the following content-types:

* application/json
* application/hal+json
* text/markdown
* text/csv.

Based on what the API returned, it does its best to create a userful interface
by looking at things such as:

* The HTTP \`Link:\` header and the HAL \`_link\` object.
* \`title\` and \`name\` properties in responses.
* \`Title\` HTTP header.
* \`_embedded\` HAL object.
* Specific link relationships, including:
  * alternate
  * author
  * code-repository
  * collection
  * create-form
  * edit
  * edit-form
  * help
  * home
  * next
  * previous
  * up

The page you are looking at is automatically generated because the API served
the \`text/markdown\` content-type and included some \`Link:\` headers.

Hal browser version: ${browserVersion}

[1]: https://github.com/evert/hal-browser
`;

}
