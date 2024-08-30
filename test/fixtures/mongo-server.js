const { MongoMemoryServer } = require("mongodb-memory-server");
const { MongoClient } = require("mongodb");
const debug = require("debug")("agenda:test:mongo-server");

let mongoServer;
let connectionString;

before(async () => {
  debug("beforeEach START");
  mongoServer = await MongoMemoryServer.create({});
  connectionString = mongoServer.getUri();
  debug('beforeEach END URI: "%s"', connectionString);
});

afterEach(async () => {
  debug("afterEach START");
  const client = new MongoClient(connectionString)

    // clear all databases and collections
    await client.connect();
    const databases = await client.db().admin().listDatabases();
    for (const db of databases.databases) {
      if (db.name !== "admin" && db.name !== "local") {
        debug('Dropping database "%s"', db.name);
        await client.db(db.name).dropDatabase();
      }
    }
  debug("afterEach END");
});

after(async () => {
  debug("after START");
  await mongoServer.stop();
  debug("after END");
});

exports.getConnectionString = async () => connectionString;
