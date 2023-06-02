import mongoose from 'mongoose';
import {MONGODB_URI} from './env'

const uri = MONGODB_URI;

/**
 * Estabalishing a connection to the MongoDB Atlas cluster before running tests
 */

const setupMongo = async () => {
    await mongoose.connect(uri!);
} 

/**
 * Disconnecting from the MongoDB Atlas cluster after running the tests
 */

const teardownMongo = async () => {
    await mongoose.disconnect();
}

/**
 * Defining Global Test hooks
 */
beforeAll(async () => {
    await setupMongo();
  });
  
afterAll(async () => {
    // Clearing all the mocks
    jest.resetAllMocks();

    // Clearing all test modules
    jest.resetModules();

    await teardownMongo();
  });