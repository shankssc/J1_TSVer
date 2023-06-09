import dotenv from 'dotenv';
import express, { Application } from 'express';
import mongoose, { ConnectOptions, Error } from 'mongoose';
import  {ApolloServer }  from "apollo-server-express"
import { PubSub } from 'graphql-subscriptions'
import { buildSchemaSync, AuthChecker } from 'type-graphql';
// import { UserResolver } from '@api/user';
import { UserResolver } from './api/user';
import { RestResolver } from './api/restaurant';
import middleware from './utils/Middleware';

dotenv.config();
const pubsub = new PubSub()

const InitServer = async () => {
    const app: Application = express()

    // Building the schema
    const schema = buildSchemaSync({
        resolvers: [UserResolver, RestResolver],
    }) 

    const server = new ApolloServer({
        schema,
        context: middleware,
        introspection: true,

    })

    await server.start()

    server.applyMiddleware({app})

    app.use((req, res) => {
        res.send("Apollo express server is up and running");
    });

    try {
        /*
        const options: ConnectOptions = {
            // useNewUrlParser: true, 
            useUnifiedTopology: true

        }
        */

        await mongoose.connect(process.env.CONNECTION_URL!);
        // console.log('Mongoose connection was successful');
            
    } catch (error:any) {
        console.log(error.message);
    }

    app.listen(process.env.PORT || 3000, () => console.log("Server is running sucessfully"));
    
};

InitServer();