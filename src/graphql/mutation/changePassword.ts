import gql from 'graphql-tag';

export const CHANGE_PASSWORD = gql`
mutation ChangePassword (
  $id: ID!, 
  $old_password: String!,
  $new_password: String!
  $confirm_password: String!
) {
    changePassword(
    id: $id, 
    old_password: $old_password,
    new_password: $new_password,
    confirm_password: $confirm_password
  ) {
   status
    message
  }
}
`;
