const sq = require('sequelize');

const user = process.env.DBUSER,
  password = process.env.DBPASSWORD,
  db = process.env.DB,
  host = process.env.HOST,
  port = process.env.DBPORT;

exports.getData = function() {
  const pg = new sq(`postgres://${user}:${password}@${host}:${port}/${db}`);
  return pg.query('SELECT ST_AsGeoJSON(geom) FROM spatial_table;');
}
