import  User  from '../../../src/models/user';
import { UserInterface } from "global";
import casual from 'casual';


export function userFactoryWorker(overrides:any): UserInterface {
    return {
      email: casual.email,
      password: casual.password,
      name: casual.word,
      createdAt: casual.date,
      updatedAt: casual.date,
      ...overrides,
    };
  }