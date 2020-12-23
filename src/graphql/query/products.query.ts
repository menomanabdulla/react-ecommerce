import gql from 'graphql-tag';

export const GET_PRODUCTS = gql`
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
      id
      type {
        id
        slug
      }
      categories {
        id
        slug
      }
      name
      slug
      description
      images
      unit
      price
      sale_price
      discount_in_percent
      product_quantity
      is_featured
      meta_title
      meta_keyword
      meta_description
    }
    totalCount
    hasMore
  }

}

`;
