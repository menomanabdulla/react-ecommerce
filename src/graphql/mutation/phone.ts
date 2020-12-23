import gql from 'graphql-tag';

export const ADD_PHONENUMBER = gql`
  mutation AddPhoneNumber ( $id: ID!, $number:  String!) {
    addPhoneNumber(
      id: $id,
      number: $number,
    ) {
      id
      number
      status
      is_primary
    }
  }
`;

export const UPDATE_PHONENUMBER = gql`
  mutation UpdatePhoneNumber ( $id: ID!, $phoneId: String!, $number:  String!) {
    updatePhoneNumber(
      id: $id,
      phoneId: $phoneId,
      number: $number,
    ) {
      id
      number
      status
      is_primary
    }
  }
`;

export const SETPRIMARY_PHONENUMBER = gql`
  mutation SetPhoneNumberPrimary  ( $id: ID!, $phoneId: String!) {
    setPhoneNumberPrimary(
      id: $id,
      phoneId: $phoneId
    ) {
     status
      message
    }
  }
`;

export const DELETE_PHONENUMBER = gql`
  mutation DeletePhoneNumber ( $id: ID!, $phoneId: String!) {
    deletePhoneNumber (
      id: $id,
      phoneId: $phoneId
    ) {
     status
      message
    }
  }
`;