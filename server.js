const sys = require('util'),
  http = require('http'),
  router = require('./router');
  pg = require('./postgres');

router.register('/', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello World');
  res.end();
});

router.register('/getData', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/json'});
  pg.getData().then(data => {
    let results = data[0].map((row) => {
      return JSON.parse(row.st_asgeojson);
    });
    results = {
      type: "GeometryCollection",
      geometries: results
    };
    console.log(results);
    res.write(JSON.stringify(results));
    res.end();
  });
});

const server = http.createServer((req, res) => {
  const handler = router.route(req);
  handler.process(req, res);
});

server.listen(8001);
console.log('Server running');
