import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { AuthenticationError, ApolloError } from 'apollo-server-express';
import jwt_decode from 'jwt-decode';
import type {Context} from '../global';
import { ApolloServerExpressConfig } from 'apollo-server-express';

dotenv.config();

const { TOKEN_SECRET } = process.env;

export default class Auth {

    static passwordHasher = async (password: string): Promise<string> => {
      const saltRounds = 15;
      const salt = bcrypt.genSaltSync(saltRounds);

      // return bcrypt.hash(password, 12);

      return bcrypt.hashSync(password, salt);
      };

    static passwordMatcher = async (password: string, storedPassword: string): Promise<boolean> => {
        //const isPasswordCorrect = await bcrypt.compare(password, storedPassword);
        const isPasswordCorrect = await bcrypt.compareSync(password, storedPassword);
        
        return isPasswordCorrect
        
        
      };

    static generateToken = async ({username, email, userId,}: {username: string; email: string; userId: string; }): Promise<string> => {
        return jwt.sign(
          { username, email, id: userId },
          TOKEN_SECRET!,
          { expiresIn: '1h' }
        );
      };

    static verifyToken = async(context:any, SECRET_KEY:any) => {
      const AuthHeader = context.req.headers.authorization
        
      if (AuthHeader) {
        const token = AuthHeader.split('Bearer ')[1]
        //console.log(token)
        if (token) {
          try {
                const user = jwt.verify(token, SECRET_KEY);
                //console.log(user)
                return user
              }
          catch (err) {
                console.log(err)
                throw new AuthenticationError('Invalid/Expired token')
              }
          }
          throw new ApolloError('Authentication token must be of Bearer [token] format')
      }
      throw new ApolloError('Authentication header must be provided')
    }
}