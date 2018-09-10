const http = require('http');
const url = require('url');

const port = 9001;

const server = http.createServer((request, response) => {
  const parseUrl = url.parse(request.url, true);
  const trimmedUrl = parseUrl.pathname.replace(/^\/+|\/+$/g, '');
  const method = request.method.toLocaleLowerCase();
  const queryStringObject = parseUrl.query;
  const route = routes[trimmedUrl];
  setJsonHeader(response);

  if (route && route[method]) {
    route[method](request, response, queryStringObject);
  }

  response.end('End');
});

const setJsonHeader = (response) => {
  response.setHeader('Content-type', 'application/json');
}

const routes = {
  json: {
    get: (request, response, queryStringObject) => {
      console.log('query', queryStringObject);
      setJsonHeader(response);
      const result = JSON.stringify({
        name: 'loki',
        info: 'gwapo'
      });
      response.end(result);
    },
    post: (request, response, queryStringObject) => {
      const result = JSON.stringify({
        name: 'POST loki',
        info: 'POST gwapo'
      });
      response.end(result);
    }
  },
  cart: (request, response) => {
    response.end('LOL CART');
  }
};


server.listen(port, () => console.log('Hello Pisti', port));