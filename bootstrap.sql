CREATE DATABASE pgis;
CREATE EXTENSION postgis;

CREATE TABLE spatial_table (id integer, name varchar, geom geometry);

INSERT INTO spatial_table VALUES
  (1, 'point', 'POINT(30 10)'),
  (2, 'line', 'LINESTRING(30 10, 10 30, 40 40)'),
  (3, 'polygon-simple',
      'POLYGON((30 10, 40 40, 20 40, 10 20, 30 10))'),
  (4, 'polygon-hole', 
      'POLYGON((35 10, 45 45, 15 40, 10 20, 35 10),(20 30, 35 35, 30 20, 20 30))');

SELECT ST_AsGeoJSON(geom) FROM spatial_table;
