import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    adduser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        password
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
        username
        password
      }
    }
  }
`;
export const ADD_SKEET_SCORE = gql`
  mutation addSkeetScore(
    $overallScore: String!
    $station: String!
    $weapon: String!
  ) {
    addSkeetScore(
      overallScore: $overallScore
      station: $station
      weapon: $weapon
    ) {
      _id
      username
      skeetScore
    }
  }
`;
export const ADD_TRAP_SCORE = gql`
  mutation addTrapScore(
    $overallScore: String!
    $station: String!
    $weapon: String!
  ) {
    addTrapScore(
      overallScore: $overallScore
      station: $station
      weapon: $weapon
    ) {
      _id
      username
      trapScore
    }
  }
`;
