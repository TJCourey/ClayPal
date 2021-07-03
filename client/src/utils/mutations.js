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
  mutation addSkeetScore($overallScore: String!) {
    addSkeetScore(overallScore: $overallScore) {
      user {
        _id
        username
      }
    }
  }
`;
export const ADD_TRAP_SCORE = gql`
  mutation addTrapScore($_id: String!, $overallScore: String!) {
    addTrapScore(_id: $_id, overallScore: $overallScore) {
      _id
      username
      trapScore
    }
  }
`;
