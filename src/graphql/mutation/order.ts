import gql from 'graphql-tag';

export const CREAT_ORDER = gql`
  mutation CreateOrder($input: OrderInput!) {
      createOrder(
        input: $input
      ) 
    {
      customer_id
      contact_number
      payment_status
      status
    }
  }
`;


export const GET_PAYMENT = gql`
  mutation($paymentInput: String!) {
    charge(paymentInput: $paymentInput) {
      status
    }
  }
`;
