import gql from 'graphql-tag';

export const GET_PRODUCTS_SEARCH = gql`
query GetProducts(
  $type: String
  $category: String
  $searchText: String
  $offset: Int
) {
  products(
    type: $type
    category: $category
    searchText: $searchText
    offset: $offset
  ) {
    items {
      type {
        slug
      }
      name
      slug
    }
  }

}

`;
