import React, { useReducer } from 'react';
import { AuthContext } from './auth.context';
const isBrowser = typeof window !== 'undefined';
const INITIAL_STATE = {
  isAuthenticated: isBrowser && !!localStorage.getItem('access_token'),
  currentForm: 'signIn',
  currentUser: false,
  user: {}
};

function reducer(state: any, action: any) {

  switch (action.type) {
    case 'SIGNIN':
      return {
        ...state,
        currentForm: 'signIn',
      };
    case 'SIGNIN_SUCCESS':
        return {
          ...state,
          isAuthenticated: true,
          user: action.user,
          currentForm: 'signIn',
        };
      case 'CURRENT_USER':
        return{
          ...state,
          currentUser: true
        }
      case 'SIGN_OUT':
        return {
          ...state,
          isAuthenticated: false,
          user: {}
        };
      case 'SIGNUP':
        return {
          ...state,
          currentForm: 'signUp',
          
        };
      case 'FORGOTPASS':
        return {
          ...state,
          currentForm: 'forgotPass',
        };
      default:
        return state;
  }
}

export const AuthProvider: React.FunctionComponent = ({ children }) => {
  const [authState, authDispatch] = useReducer(reducer, INITIAL_STATE);
  //console.log(authState);
  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
