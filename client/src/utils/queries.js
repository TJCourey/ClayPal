import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query users {
    users {
      username
      email
      password
      skeetScore {
        _id
        overallScore
        station
        weapon
        date
      }
      trapScore {
        _id
        overallScore
        weapon
        date
      }
    }
  }
`;

export const QUERY_USERNAME = gql`
  query user($username: String!) {
    user(username: $username) {
      username
      email
      password
      skeetScore {
        _id
        overallScore
        station
        weapon
        date
      }
      trapScore {
        _id
        overallScore
        weapon
        date
      }
    }
  }
`;
