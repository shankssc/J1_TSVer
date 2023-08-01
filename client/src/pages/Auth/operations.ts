import { gql } from "@apollo/client";

export const SIGNUP_MUTATION = gql`
  mutation Signup($registerInput: RegisteringUserInput!) {
    signup(registerInput: $registerInput) {
      uid
      _id
      username
      email
      password
      role
      token
    }
  }
  `;

export const SIGNIN_MUTATION = gql`
  mutation Signin($signInInput: LogInInput!) {
    signin(signInInput: $signInInput) {
      username
      email
      token
    }
  }
  `;