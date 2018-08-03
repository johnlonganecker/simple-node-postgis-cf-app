const sys = require('util'),
  http = require('http'),
  router = require('./router');

router.register('/', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello World');
  res.end();
});

const server = http.createServer((req, res) => {
  const handler = router.route(req);
  handler.process(req, res);
});

server.listen(8001);
console.log('Server running');
