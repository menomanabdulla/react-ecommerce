import gql from 'graphql-tag';

export const GET_COUPON = gql`
mutation GetCoupon( $code: String! ){
    getCoupon( code: $code ) {
        coupon {
            id
            title
            code
            percentage
            maximum_discount_amount
            expiration_date
            status
        }
        message {
            message
            status
        }
    }
  }
`;
