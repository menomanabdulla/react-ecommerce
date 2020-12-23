
import gql from 'graphql-tag';

export const DELIVERY_METHOD = gql`
query GetDeliveryMethods {
    deliveryMethods(limit: 0) {
      items {
        id
        name
        details
        created_at
      }
      totalCount
      hasMore
    }
  }
`;