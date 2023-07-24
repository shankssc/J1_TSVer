import  User  from '../../../src/models/user';
import { UserInterface } from "global";
import uuid from 'node-uuid';
import casual from 'casual';


export function userFactoryWorker(overrides: Partial<UserInterface>, role: 'CUSTOMER' | 'BUSINESS_OWNER' | 'CARRIER' | 'ADMINISTRATOR'): UserInterface {
  return new User({
    uid: uuid.v4(),
    username: casual.username,
    email: casual.email,
    password: casual.password,
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  });
}