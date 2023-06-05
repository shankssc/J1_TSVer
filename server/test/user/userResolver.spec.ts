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

