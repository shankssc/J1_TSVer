import 'reflect-metadata';
import {interceptor} from '../interceptor';
import casual from 'casual';
import {factory} from '../factory/factory';
import  { ApolloServer }  from "apollo-server-express";
import { UserResolver } from '../../src/api/user';
import { buildSchemaSync } from 'type-graphql';
import express, { Application } from 'express';
import { hooks } from '../hooks';
import Auth from '../../src/utils/Authentication';

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
    const username = casual.username;
    const email = casual.email;
    const password =  casual.password;
    const role = 'CUSTOMER';
    let user:any;
    let req:any;
    let res:any;

    it('should sign up a new user', async () => {
        
        // Defining the test data
        

        // Preparing the user credentials before registering
        const registerInput = {
            username,
            email,
            password: Auth.passwordHasher(password),
            role,
        }
        
        // Build and mock the test data before the testing
        beforeAll(async () => {
        // Create a user in user database table using factory
        user = await factory.build('user', {username, email, password, role});

        // Assignee the defined variables
        req = mockRequest();
        res = mockResponse();
        });

        it('should create a new user', async () => {
            // Mock the request body
            req.body = {
              registerInput,
            };
      
            // Call the signup mutation resolver
            const result = await server.executeOperation({
              query: `
                mutation signup($registerInput: RegisteringUserInput!) {
                  signup(registerInput: $registerInput) {
                    username
                    email
                    password
                    role
                  }
                }
              `,
              variables: {
                registerInput,
              },
            });
      
            // Expect the result to contain the newly created user
            const newUser = result.data?.signup;
            expect(newUser).toBeDefined();
            expect(newUser?.uid).toBe(user.uid);
            expect(newUser?._id).toBe(user._id);
            expect(newUser?.username).toBe(user.username);
            expect(newUser?.email).toBe(user.email);
            expect(newUser?.password).toBe(user.password);
            expect(newUser?.role).toBe(user.role);
            expect(newUser?.token).toBe(user.token);
        });
    });

    it('should log in an existing user', async () => {
        // Mock the request body
        req.body = {
        signInInput: {
            email,
            password,
          },
        };
    
        // Call the login mutation resolver
        const result = await server.executeOperation({
          query: `
            mutation signin($signInInput: LogInInput!) {
              login(signInInput: $signInInput) {
                username
                email
                token
              }
            }
          `,
          variables: {
            loginInput: {
              username,
              password,
            },
          },
        });
    
        // Expect the result to contain the logged-in user
        const loggedInUser = result.data?.signin;
        expect(loggedInUser).toBeDefined();
        expect(loggedInUser?.username).toBe(username);
        expect(loggedInUser?.email).toBe(email);
        expect(loggedInUser?.token).toBeDefined();
    });
});
        
