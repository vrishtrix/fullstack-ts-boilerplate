import gql from 'graphql-tag';

export const authFragments = {
  user: gql`    
    fragment UserData on User {
      id,
      username,
      email,
    }
  `,
};

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ...UserData,
      token
    }
  }
  ${authFragments.user}
`;

export const SIGNUP_MUTATION = gql`
  mutation Signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      ...UserData,
      token
    }
  }
  ${authFragments.user}
`;

export const LOGOUT_QUERY = gql`
  mutation Logout($token: String!) {
    logout(token: $token)
  }
`;
