import {factory} from 'factory-girl';
// @ts-ignore
import { MongooseAdapter } from '../adapter';
// @ts-ignore
import {defineUserFactory} from './user';
// @ts-ignore

/**
 * Generates and defines a factory object that can create all of our data models
 */

factory.setAdapter(new MongooseAdapter());

defineUserFactory(factory);

export {factory};