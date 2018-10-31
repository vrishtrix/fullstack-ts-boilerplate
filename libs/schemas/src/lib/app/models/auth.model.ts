import gql from 'graphql-tag';

export const authFragments = {
  user: gql`
    fragment UserResponse on User {
      id
      username
      email
      roles
    }
  `,
  /*authPayload: gql`
    fragment AuthPayloadData on AuthPayload {
      user {
        id,
        username,
        email,
      }
      token
    }
  `,*/
};

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        ...UserResponse 
      }
      jwt
    }
  }
  ${authFragments.user}
`;

export const SIGNUP_MUTATION = gql`
  mutation signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      user {
        ...UserResponse
      }
      jwt
    }
  }
  ${authFragments.user}
`;

export const LOGOUT_QUERY = gql`
  mutation Logout($token: String!) {
    logout(token: $token)
  }
`;
