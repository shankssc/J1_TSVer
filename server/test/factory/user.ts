import { userFactoryWorker } from "./workers/user";
import user from "../../src/models/user";

/**
 * Defines all the user schematics for a factory
 * @param {object} factory - Factory-Girl factory object
 */

export function defineUserFactory(factory:any) {
    factory.define('user', user, userFactoryWorker);
  }