exports.createHandler = method => {
  return new Handler(method);
}

const Handler = function(method) {
  this.process = function(req, res) {
    const params = null;
    return method.apply(this, [req, res, params]);
  };
}
