import gql from 'graphql-tag';

export const GET_PRODUCT_WITH_RELATED_PRODUCTS = gql`
  query getProductWithRelatedProducts($slug: String!, $type: String!) {
    product(slug: $slug) {
      id
      title
      weight
      slug
      price
      type
      image
      categories {
        id
        slug
        title
      }
    }
    relatedProducts(slug: $slug, type: $type) {
      id
      title
      slug
      weight
      price
      type
      image
    }
  }
`;

export const GET_RELATED_PRODUCTS = gql`
  query getRelatedProducts($type: String!, $slug: String!) {
    relatedProducts(type: $type, slug: $slug) {
      id
      title
      slug
      weight
      price
      type
      image
    }
  }
`;

export const GET_PRODUCT = gql`
  query getProduct($slug: String!) {
    product(slug: $slug) {
      id
      title
      weight
      slug
      price
      discountInPercent
      type
      gallery {
        url
      }
      image
      categories {
        id
        slug
        title
      }
    }
  }
`;
export const GET_PRODUCT_DETAILS = gql`
  query GetProduct($slug: String!) {
    getProduct(slug: $slug) {
       id
          type {
            id
            slug
            name
          }
          categories {
            id
            slug
            name
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
  }
`;
