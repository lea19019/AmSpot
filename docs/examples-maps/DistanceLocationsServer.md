To build a server or a database containing several other locations and get the X closest locations to the location you just sent, you can use a spatial database such as PostGIS or MongoDB with geospatial indexes. Here are the general steps to implement this:

Store the location data: Store the location data in the database with latitude and longitude coordinates.

Add geospatial indexes: Add a geospatial index on the location data in the database to enable spatial queries. For example, in PostGIS, you can create a spatial index using the CREATE INDEX command.

Calculate the distance: Calculate the distance between the location you just sent and the locations in the database using a distance formula such as the Haversine formula.

Query the database: Use a spatial query to retrieve the X closest locations to the location you just sent. For example, in PostGIS, you can use the ST_DistanceSphere and ORDER BY clauses to query the database for the closest locations.

Return the results: Return the X closest locations to the location you just sent as the response.

Here's an example Node.js code snippet that uses PostGIS and the pg module to retrieve the 10 closest locations to a given location:

```js
const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'mydb',
  password: 'mypassword',
  port: 5432,
});

client.connect();

const lat = 37.7749; // latitude of the location you just sent
const lon = -122.4194; // longitude of the location you just sent
const limit = 10; // number of closest locations to retrieve

const query = `
  SELECT name, ST_DistanceSphere(location, ST_MakePoint($1, $2)) AS distance
  FROM locations
  ORDER BY distance ASC
  LIMIT $3
`;

client.query(query, [lon, lat, limit], (err, res) => {
  console.log(err ? err.stack : res.rows);
  client.end();
});
```

In this code, we are connecting to a PostGIS database using the pg module, calculating the distance between the given location and the locations in the database using the ST_DistanceSphere function, and querying the database for the 10 closest locations using the ORDER BY and LIMIT clauses. The results are returned as an array of rows containing the name and distance of each location.


To implement the same functionality with MongoDB, you can use the geospatial indexes and the $geoNear aggregation pipeline stage. Here are the general steps:

Store the location data: Store the location data in a MongoDB collection with a field for latitude and a field for longitude coordinates.

Create a geospatial index: Create a geospatial index on the location data in the collection to enable geospatial queries. For example, you can create a 2dsphere index on the location field using the createIndex() method.

Query the database: Use the $geoNear aggregation pipeline stage to query the collection for the X closest locations to the location you just sent. The $geoNear stage takes a near parameter that specifies the starting point for the query, a distanceField parameter that specifies the field to store the distance between the starting point and each location, and a limit parameter that specifies the number of locations to return.

Return the results: Return the X closest locations to the location you just sent as the response.

Here's an example Node.js code snippet that uses MongoDB and the mongodb module to retrieve the 10 closest locations to a given location:

```js
const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

client.connect((err) => {
  if (err) throw err;

  const db = client.db('mydb');
  const collection = db.collection('locations');

  const lat = 37.7749; // latitude of the location you just sent
  const lon = -122.4194; // longitude of the location you just sent
  const limit = 10; // number of closest locations to retrieve

  collection.createIndex({ location: '2dsphere' }, (err) => {
    if (err) throw err;

    collection.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [lon, lat] },
          distanceField: 'distance',
          spherical: true,
          limit: limit,
        },
      },
      { $project: { name: 1, distance: 1, _id: 0 } },
    ]).toArray((err, docs) => {
      if (err) throw err;

      console.log(docs);
      client.close();
    });
  });
});
```

In this code, we are connecting to a MongoDB database using the mongodb module, creating a 2dsphere index on the location field, and using the $geoNear aggregation pipeline stage to query the collection for the 10 closest locations to the given location. The results are returned as an array of documents containing the name and distance of each location.


Example 1: Using PostGIS in TypeScript

```ts
import { Client } from 'pg';

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'mydb',
  password: 'mypassword',
  port: 5432,
});

client.connect();

const lat = 37.7749; // latitude of the location you just sent
const lon = -122.4194; // longitude of the location you just sent
const limit = 10; // number of closest locations to retrieve

const query = `
  SELECT name, ST_DistanceSphere(location, ST_MakePoint($1, $2)) AS distance
  FROM locations
  ORDER BY distance ASC
  LIMIT $3
`;

client.query(query, [lon, lat, limit], (err, res) => {
  console.log(err ? err.stack : res.rows);
  client.end();
});
```
Example 2: Using MongoDB in TypeScript

```ts
import { MongoClient, Db } from 'mongodb';

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

client.connect((err) => {
  if (err) throw err;

  const db: Db = client.db('mydb');
  const collection = db.collection('locations');

  const lat = 37.7749; // latitude of the location you just sent
  const lon = -122.4194; // longitude of the location you just sent
  const limit = 10; // number of closest locations to retrieve

  collection.createIndex({ location: '2dsphere' }, (err) => {
    if (err) throw err;

    collection.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [lon, lat] },
          distanceField: 'distance',
          spherical: true,
          limit: limit,
        },
      },
      { $project: { name: 1, distance: 1, _id: 0 } },
    ]).toArray((err, docs) => {
      if (err) throw err;

      console.log(docs);
      client.close();
    });
  });
});
```
Note that we have added type annotations for the Db object and used throw instead of throw err in the error handling.