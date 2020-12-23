import { useMemo } from 'react';
//import { ApolloClient } from 'apollo-client';
//import { InMemoryCache } from 'apollo-cache-inmemory';
//import { HttpLink, createHttpLink } from 'apollo-link-http';
//import { setContext } from 'apollo-link-context';

import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat,
} from '@apollo/client';

let apolloClient;

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT,
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  },
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  let token = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('access_token');
  }
  operation.setContext({
    headers: {
      'x-access-token': token ? token : '',
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  link: authMiddleware.concat(httpLink),
  cache: new InMemoryCache(),
});

/*
console.log(process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT);
function createApolloClient() {
  let token = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('access_token');
  }
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT, // Server URL (must be absolute)
      credentials: 'same-origin', // Additional fetch() options like `credentials`
      headers: {
        'x-access-token': token ? token : '',
      }, // Additional fetch() options like `headers`
      onError: ({ networkError, graphQLErrors }) => {
        console.log('graphQLErrors', graphQLErrors);
        console.log('networkError', networkError);
      },
    }),
    cache: new InMemoryCache(),
  });
}*/

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? client;

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}

/*

import { useMemo } from 'react';
import {ApolloClient, ApolloLink, HttpLink, InMemoryCache} from 'apollo-boost';
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT, // Server URL (must be absolute)
  credentials: 'same-origin', // Additional fetch() options like `credentials`
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  },
});
const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  let token = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('access_token');
  }
  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      'x-access-token': token ? token : ''
    }
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

let apolloClient;
function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}


*/
