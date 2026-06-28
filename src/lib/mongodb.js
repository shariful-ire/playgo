import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI environment variable is not set");
}

if (!globalThis._mongoClient) {
  globalThis._mongoClient = new MongoClient(uri);
  globalThis._mongoClientPromise = globalThis._mongoClient.connect();
}

const client = globalThis._mongoClient;
const clientPromise = globalThis._mongoClientPromise;

export { client, clientPromise };
