import gql from 'graphql-tag';

export const GET_TYPE= gql`
  query Types($searchText: String) {
    types(searchText: $searchText) {
      totalCount
        items{
          id
          name
          slug
          image
          icon
          home_title
          home_subtitle
          meta_title
          meta_keyword
          meta_description
        }
    }
  }
`;
