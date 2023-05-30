import "reflect-metadata";
import { ObjectType, 
         Field, 
         InputType, 
         registerEnumType, 
         Query, 
         Resolver,
         Mutation, 
         Arg,
         Authorized } from 'type-graphql';

import User from '@models/user';
import Auth from '@utils/Authentication';
import { ApolloError } from "apollo-server-express";
import { Document } from "mongoose";
import { AddUser } from "global";
/*
import { gql } from 'apollo-server-express'

const User = gql`

    enum Role {
        CUSTOMER
        BUSINESS_OWNER
        CARRIER
        ADMINISTRATOR
    }

    type User {
        uid: String!
        _id: ID!
        username: String
        email: String
        password: String!
        role: Role!
        token: String
    }

    input RegisteringUser {
        username: String!
        email: String!
        password: String!
        role: Role!
    }

    input LogInInput {
        username: String!
        email: String
        password: String!
    }

    type Query {
        getUser(id: ID!): User
        getUsers: [User]
    }

    type Mutation {
        signup(registerInput: RegisteringUser): User!,

        login(loggingInput: LogInInput): User!

           
    }

`;

export default User
*/

// Enum definition
enum Role {
    CUSTOMER,
    BUSINESS_OWNER,
    CARRIER,
    ADMINISTRATOR,
}
  
// User type
@ObjectType()
class UserType {
  @Field()
  uid!: string;

  @Field()
  _id!: string;

  @Field({ nullable: true })
  username?: string;

  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field(() => Role)
  role!: Role;

  @Field({ nullable: true })
  token?: string;
}

// RegisteringUser input type
@InputType()
class RegisteringUserInput {
  @Field()
  username!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field(() => Role)
  role!: Role;
}

// LogInInput input type
@InputType()
class LogInInput {
  @Field()
  username!: string;

  /*
  @Field({ nullable: true })
  email?: string;
  */

  @Field()
  password!: string;
}

// User resolver
@Resolver()
class UserResolver {
    @Query(() => UserType)
    @Authorized()
    async getUser(@Arg('id') id: string): Promise<UserType | null> {
        /*
        if (!context.userId) {
            throw new ApolloError('You must be authenticated!');
          }
      
          if (context.userId !== id) {
            throw new ApolloError('You can only view your own data');
          }
        */

        const user = await User.findById(id);
        return user ? user.toObject() : null;
    }

    @Query(() => [UserType])
    async getUsers(): Promise<UserType[]> {
    
    const users = await User.find();
    return users.map(user => user.toObject());
    }

    @Mutation(() => UserType)
    async signup(@Arg('registerInput') registerInput:RegisteringUserInput): Promise<UserType> {
        const { username, email, password, role } = registerInput;
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            throw new ApolloError(`A user is already registered with the email ${email}`);
        }

        try {
            const hashedPassword = await Auth.passwordHasher(password);
      
            const user = new User({ username, email, password: hashedPassword, role });
      
            const jwt = await Auth.generateToken({
              userId: user.uid,
              username: user.username,
              email: user.email,
            });
      
            user.token = jwt;
      
            await user.save();
      
            console.log(user);
            console.log('new user created');
      
            //return { id: user.id, ...user.toObject() };
            return {...user.toObject()}

          } catch (error) {
            throw new ApolloError('User creation failed');
          }
    }

    @Mutation(() => UserType)
    async signin(@Arg('signInInput') signInInput:LogInInput): Promise<Pick<UserType, 'username' | 'email' | 'token'>> {
        const { username, password } = signInInput;

        if (!username  || !password) {
          throw new ApolloError('email/password required');
        }

        const activeUser = await User.findOne({username});

        if (!activeUser) {
          throw new ApolloError('user not found please try again')
        }

        const passcheck = Auth.passwordMatcher(password, activeUser.password)

        if (!passcheck) {
          throw new ApolloError('Invalid password please try again')
        }

        else {
          const jwt = await Auth.generateToken({
              userId: activeUser.uid,
              username: activeUser.username,
              email: activeUser.email
          })

          activeUser.token = jwt

          return {
            username: activeUser.username,
            email: activeUser.email,
            token: jwt,
        };
      }
    }
}

export { UserType, RegisteringUserInput, LogInInput, UserResolver };