import 'reflect-metadata';
import {interceptor} from '../interceptor';
import casual from 'casual';
import {factory} from '../factory/factory';
import  { ApolloServer }  from "apollo-server-express";
import { UserResolver } from '../../src/api/user';
import { buildSchemaSync } from 'type-graphql';
import express, { Application } from 'express';
import { hooks } from '../hooks';

const app: Application = express()

// Building the schema
const schema = buildSchemaSync({
    resolvers: [UserResolver],
}) 

const server = new ApolloServer({
    schema,
    context: ({ req }) => {
        return {
            req,
        };
    },

})

// Initializing Global hook before the test
hooks();

// Init mock request and response from interceptor
const {mockRequest, mockResponse} = interceptor;

describe('User Resolvers', () => {
    it('should sign up a new user', async () => {
        
        // Defining the test data
        const username = casual.username;
        const email = casual.email;
        const password =  casual.password;
        const role = 'CUSTOMER';
        let user;
        let req:any;
        let res:any;

        // Preparing the user credentials before registering
        const registerInput = {
            username,
            email,
            password,
            role,
        }
        
        // Build and mock the test data before the testing
        beforeAll(async () => {
        // Create a user in user database table using factory
        user = await factory.build('user', {username, email, password, role});

        // Assignee the defined variables
        req = mockRequest();
        res = mockResponse();
        })

    })
})
