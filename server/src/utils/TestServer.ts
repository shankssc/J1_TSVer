import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

// Import your resolvers and other necessary modules
import { UserResolver } from '../api/user';

export async function createTestServer(): Promise<express.Application> {
  const app = express();

  // Build the GraphQL schema
  const schema = await buildSchema({
    resolvers: [UserResolver], // Add your resolvers here
  });

  // Create an ApolloServer instance with the schema
  const apolloServer = new ApolloServer({
    schema,
    context: () => {
      // You can customize the context object if needed
      return {};
    },
  });

  // Mount the Apollo Server middleware on the Express app
  apolloServer.applyMiddleware({ app, path: '/graphql' });

  return app;
}