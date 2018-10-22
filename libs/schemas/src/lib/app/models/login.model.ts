import gql from 'graphql-tag';

export const loginMutation = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id,
        username,
        email,
      },
      token,
    }
  }
`;
