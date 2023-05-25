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