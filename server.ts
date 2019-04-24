const express = require('express');
const next = require('next');
const { parse } = require('url');
// console.log('process.env', process.env);
console.log('process.env.NODE_ENV', process.env.NODE_ENV);

const port = parseInt(process.env.PORT, 10) || 3006;
const dev = process.env.NODE_ENV.trim() !== 'production';


const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    server.get('/user/detail', (req, res) => {
      console.log('req', req);
      return app.render(req, res, `/user/detail/${req.query.uid}`);
    });

    server.get('*', (req, res) => {
      const parsedUrl = parse(req.url, true);
      const { pathname } = parsedUrl;
      if (typeof pathname !== 'undefined' && pathname.indexOf('/user/detail/') > -1) {
        const query = { uid: pathname.split('/')[3] };
        return app.render(req, res, '/user/detail', query);
      }
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
