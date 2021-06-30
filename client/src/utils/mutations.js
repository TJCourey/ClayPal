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
  mutation addSkeetScore($station: String!, $weapon: String!) {
    addSkeetScore(station: $station, weapon: $weapon) {
      _id
      username
    }
  }
`;
export const ADD_TRAP_SCORE = gql`
  mutation addTrapScore($station: String!, $weapon: String!) {
    addTrapScore(station: $station, weapon: $weapon) {
      _id
      username
    }
  }
`;
