import type { Context } from '../global';
import { ApolloServerExpressConfig, ApolloError, AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { TOKEN_SECRET } = process.env;

const middleware: ApolloServerExpressConfig['context'] = ({ req }) => {
  const context: Context = {
    req,
    user: {
      id: '',
      username: '',
      token: '',
    },
  };

  const token = req.headers.authorization?.split('Bearer ')[1];

  if (token) {
    try {
      const decodedToken = jwt.verify(token, TOKEN_SECRET!) as { id: string; username: string; email: string; };

      context.user.id = decodedToken.id;
      context.user.username = decodedToken.username;
    } catch (err) {
      console.log(err);
      throw new AuthenticationError('Invalid/Expired token');
    }
  }

  return context;
};

export default middleware;
