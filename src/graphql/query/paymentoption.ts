
import gql from 'graphql-tag';

export const PAYMENT_OPTION = gql`
    query GetPaymentOptions{
    paymentOptions(limit: 0) {
      items {
        id
        name
        type
        image
        details
        created_at
      }
      totalCount
      hasMore
    }
  }
`;