import gql from 'graphql-tag';

export const SIGNIN_MUTATION = gql`
mutation Login($phone: String!, $password: String!) {
    login(phone: $phone, password: $password) {
        user {
            id
            phones{
                number
            }
        }
        access_token
    }
}
`;