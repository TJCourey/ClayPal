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
        date
      }
      trapScore {
        _id
        overallScore
        date
      }
    }
  }
`;

export const QUERY_USERNAME = gql`
  query user {
    user {
      username
      email
      password
      skeetScore {
        _id
        overallScore
        date
      }
      trapScore {
        _id
        overallScore
        date
      }
    }
  }
`;
