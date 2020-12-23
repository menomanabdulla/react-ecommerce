import gql from 'graphql-tag';

export const GET_CATEGORIES = gql`
query GetCategories(
  $type: String
){
	shopCategories(
    type: $type
  ) {
    items {
        id
        parent_id
        name
        slug
        banner
        icon
        children {
          id
          name
          slug
          banner
          icon
        }
      }
      totalCount
      hasMore
    }
  }
`;

