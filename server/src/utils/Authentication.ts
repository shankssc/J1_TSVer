import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { AuthenticationError, ApolloError } from 'apollo-server-express';
import jwt_decode from 'jwt-decode';


dotenv.config();

const { TOKEN_SECRET } = process.env;

export default class Auth {

    static passwordHasher = async (password: string): Promise<string> => {
        return bcrypt.hash(password, 12);
      };

    static passwordMatcher = async (password: string, storedPassword: string): Promise<boolean> => {
        const isPasswordCorrect = await bcrypt.compare(password, storedPassword);
        return isPasswordCorrect;
      };

    static generateToken = async ({username, email, userId,}: {username: string; email: string; userId: string; }): Promise<string> => {
        return jwt.sign(
          { username, email, id: userId },
          TOKEN_SECRET!,
          { expiresIn: '1h' }
        );
      };
}