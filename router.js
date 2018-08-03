let handlerFactory = require('./handler'),
  fs = require('fs'),
  sys = require('util'),
  parser = require('url'),
  handlers = {};

exports.clear = () => {
  handlers = {};
}

exports.register = function(url, method) {
  handlers[url] = handlerFactory.createHandler(method);
}

exports.route = function(req) {
  const url = parser.parse(req.url, true);
  let handler = handlers[url.pathname];
  if(!handler) {
    handler = this.missing(req);
  }
  return handler;
}

exports.missing = function(req) {
  const url = parser.parse(req.url, true),
    path = __dirname + '/assets/' + url.pathname
  try {
    const data = fs.readFileSync(path),
      mimeType = path.indexOf('.css') !== -1 ? 'text/css' : 'text/html',
      mime = req.headers.accepts || mimeType;

    return handlerFactory.createHandler((req, res) => {
      res.writeHead('200', {'Content-Type': mime});
      res.write(data);
      res.end();
    });
  }
  catch(e) {
    return handlerFactory.createHandler((req, res) => {
      res.writeHead('404', {'Content-Type': 'text/plain'});
      res.write('No Route registered for ' + url.pathname);
      res.end();
    });
  }
}
