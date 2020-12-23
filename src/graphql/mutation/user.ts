import gql from 'graphql-tag';

export const UPDATE_USER = gql`
mutation UpdateUser(
  $id: ID!, 
  $name: String!,
  $email: String!
) {
updateUserNameAndEmail(
    id: $id, 
    name: $name,
    email: $email
  ) {
   status
    message
  }
}
`;
