import gql from 'graphql-tag';

export const GET_SETTING = gql`
  query GetSetting {
    getSiteSetting(key: "site-settings") {
      id
      key
      value
    }
  }
`;
