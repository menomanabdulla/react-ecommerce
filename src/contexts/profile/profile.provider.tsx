import React, { useReducer } from 'react';
import { ProfileContext } from './profile.context';

type Action =
  | { type: 'HANDLE_ON_INPUT_CHANGE'; payload: any }
  | { type: 'HANDLE_PASSWORD_CLEAR'; payload: any }
  | { type: 'ADD_CONTACT'; payload: any }
  | { type: 'UPDATE_CONTACT'; payload: any }
  | { type: 'DELETE_CONTACT'; payload: any }
  | { type: 'ADD_ADDRESS'; payload: any }
  | { type: 'UPDATE_ADDRESS'; payload: any }
  | { type: 'DELETE_ADDRESS'; payload: any }
  | { type: 'ADD_CARD'; payload: any }
  | { type: 'DELETE_CARD'; payload: any }
  | { type: 'SET_PRIMARY_CONTACT'; payload: any }
  | { type: 'SET_PRIMARY_ADDRESS'; payload: any }
  | { type: 'SET_PRIMARY_SCHEDULE'; payload: any }
  | { type: 'SET_PRIMARY_CARD'; payload: any };
function reducer(state: any, action: Action): any {
  switch (action.type) {
    case 'HANDLE_ON_INPUT_CHANGE':
      return { ...state, [action.payload.field]: action.payload.value };
    
    case 'ADD_CONTACT':
      const newContact = {
        ...action.payload.values,
      };
      return {
        ...state,
        phones: [...state.phones, newContact],
      };
    
    case 'UPDATE_CONTACT':
      if (action.payload.id !== null ) {
        return {
          ...state,
          phones: state.phones.map((item: any) =>
            item.id == action.payload.id
              ? { ...item, ...action.payload.values }
              : item
          ),
        };
      }
        
    case 'DELETE_CONTACT':
      return {
        ...state,
        phones: state.phones.filter(
          (item: any) => item.id !== action.payload
        ),
      };
    
    case 'ADD_ADDRESS':
      const newAdress = {
        ...action.payload
      };
      if(state.delivery_address == null){
        return {
          ...state,
          delivery_address: [newAdress],
        };
      }else{
        return {
          ...state,
          delivery_address: [...state.delivery_address, newAdress],
        };
      }
    case 'UPDATE_ADDRESS':
        if (action.payload.id) {
          return {
            ...state,
            delivery_address: state.delivery_address.map((item: any, index: any) =>
              item.id === action.payload.id
                ? { ...item, ...action.payload.value }
                : item
            ),
          };
        }
    case 'DELETE_ADDRESS':
      return {
        ...state,
        delivery_address: state.delivery_address.filter(
          (item: any, index: any) => item.id !== action.payload
        ),
      };
    case 'ADD_CARD':
      const newCard = {
        id: action.payload.id,
        type: state.card.length === '0' ? 'primary' : 'secondary',
        cardType: action.payload.brand.toLowerCase(),
        name: state.name,
        lastFourDigit: action.payload.last4,
      };
      return {
        ...state,
        card: [newCard, ...state.card],
      };
    case 'DELETE_CARD':
      return {
        ...state,
        card: state.card.filter((item: any) => item.id !== action.payload),
      };
    case 'SET_PRIMARY_CONTACT':
      return {
        ...state,
        phones: state.phones.map((item: any) =>
          item.id === action.payload
            ? { ...item, is_primary: true, type: 'primary' }
            : { ...item, is_primary: false, type: 'secondary' }
        ),
      };
    case 'SET_PRIMARY_ADDRESS':
      return {
        ...state,
        delivery_address: state.delivery_address.map((item: any, index: any) =>
          item.id == action.payload
            ? { ...item, is_primary: true }
            : { ...item, is_primary: false }
        ),
      };
    case 'SET_PRIMARY_SCHEDULE':
      return {
        ...state,
        deliveryMethods: state.deliveryMethods.map((item: any) =>{
         return( item.id === action.payload
          ? { ...item, type: 'primary' }
          : { ...item, type: 'secondary' }
          )}
        ),
      };
    case 'SET_PRIMARY_CARD':
      return {
        ...state,
        paymentMethods: state.paymentMethods.map((item: any) =>
          item.id === action.payload
            ? { ...item, type: 'primary' }
            : { ...item, type: 'secondary' }
        ),
      };
    default:
      return state;
  }
}

type ProfileProviderProps = {
  initData: any;
};

export const ProfileProvider:  React.FunctionComponent<ProfileProviderProps>  =  ({
  children,
  initData,
}) =>  {
  console.log(initData)
  const [state, dispatch] = useReducer(reducer, { ...initData });
 
  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};
