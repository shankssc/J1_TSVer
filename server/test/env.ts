import dotenv from 'dotenv';

dotenv.config()

const RandNumGen = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

// You might have to run npm audit fix faker --force for it to actually work
// import faker from 'faker';
/**
 * Loading a test environment
 */
const SILENCE_REPORT = process.env.SILENCE_REPORT;
// const PORT = faker.datatype.number(1000, 9000);
const PORT = RandNumGen(1000,9000);
const NODE_ENV = process.env.NODE_ENV;
const SERVER_TIMEOUT = process.env.SERVER_TIMEOUT;

/** 
 * MongoDB 
 */
const MONGODB_URI = process.env.MONGODB_URI;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

/**
 * REDIS
 */
const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
const REDIS_DB = process.env.REDIS_DB;

/**
 * JWT
 */
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_KEY = process.env.JWT_KEY;
const JWT_TTL = process.env.JWT_TTL;
const JWT_ENCRYPTION_KEY = process.env.JWT_ENCRYPTION_KEY;

/**
 * HMAC
 */
const HTTP_HMAC_PRIVATE_KEY = process.env.HTTP_HMAC_PRIVATE_KEY;
const HTTP_HMAC_PUBLIC_KEY = process.env.HTTP_HMAC_PUBLIC_KEY;

export {
    SILENCE_REPORT,
    PORT,
    NODE_ENV,
    SERVER_TIMEOUT,
    MONGODB_URI,
    MONGO_USER,
    MONGO_PASSWORD,
    JWT_SECRET,
    JWT_KEY,
    JWT_TTL,
    JWT_ENCRYPTION_KEY,
    HTTP_HMAC_PRIVATE_KEY,
    HTTP_HMAC_PUBLIC_KEY
}
