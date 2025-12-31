import { MongoClient } from "mongodb";

const MONGO_URL =
  process.env.MONGO_URL ||
  "mongodb://admin:password123@localhost:27018/ecommerce?authSource=admin";
const DB_NAME = "ecommerce";
const COLLECTION_NAME = "products";

let mongoClient = null;
let mongoConnection = null;

export async function makeMongoDatabase() {
  try {
    mongoClient = new MongoClient(MONGO_URL);
    await mongoClient.connect();
    mongoConnection = mongoClient.db(DB_NAME);

    const productsCollection = mongoConnection.collection(COLLECTION_NAME);

    await productsCollection.createIndex({ title: 1 }, { unique: true });

    console.log("The database was installed successfully");
  } catch (error) {
    console.error("Error in initializing database:", error);
    throw error;
  }
}
