import gql from 'graphql-tag';

export const SIGNUP_MUTATION = gql`
mutation SignUp($phone: String!, $password: String!) {
  signUp(phone: $phone, password: $password) {
    user {
      phones{
        number
      }
    }
    access_token
  }
}
`;