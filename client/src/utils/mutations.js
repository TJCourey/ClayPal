import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        password
        email
      }
    }
  }
`;
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        password
      }
    }
  }
`;
export const ADD_SKEET_SCORE = gql`
  mutation addSkeetScore(
    $station: [String!]
    $weapon: String!
    $shooter: String!
    $overallScore: String!
  ) {
    addSkeetScore(
      station: $station
      weapon: $weapon
      shooter: $shooter
      overallScore: $overallScore
    ) {
      _id
      username
    }
  }
`;
export const ADD_TRAP_SCORE = gql`
  mutation addTrapScore(
    $station: [String!]
    $weapon: String!
    $shooter: String!
    $overallScore: String!
  ) {
    addTrapScore(
      station: $station
      weapon: $weapon
      shooter: $shooter
      overallScore: $overallScore
    ) {
      _id
      username
    }
  }
`;
