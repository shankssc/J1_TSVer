import mongoose from 'mongoose';
import {MONGODB_URI, REDIS_HOST, REDIS_PORT} from './env';
import Redis from 'ioredis';


const uri = MONGODB_URI;

/**
 * Creating a Redis client instance and connecting it to the Redis server
 */
const redisClient = new Redis({
  host: REDIS_HOST,
  port: parseInt(REDIS_PORT!),
});

/**
 * Estabalishing a connection to the MongoDB Atlas cluster before running tests
 */

const setupMongo = async () => {
    await mongoose.connect(uri!);

    // Set up Redis caching
    redisClient.set('myKey', 'myValue');
} 

/**
 * Disconnecting from the MongoDB Atlas cluster after running the tests
 */

const teardownMongo = async () => {
    await mongoose.disconnect();

    // Clean up Redis resources
    await redisClient.flushall();
    redisClient.quit();
}

/**
 * Defining Global Test hooks
 */

export const hooks = () => {
  beforeAll(async () => {
      await setupMongo();
    });
    
  afterAll(async () => {
      // Clearing all the mocks
      jest.resetAllMocks();

      // Clearing all test modules
      jest.resetModules();

      await teardownMongo();

      // Clearing all the data stored in the cache
      await redisClient.flushdb();
    });
}

export const ResteMongo = async () => {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany({});
  }
}