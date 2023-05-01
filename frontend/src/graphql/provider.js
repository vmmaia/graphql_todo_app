import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const BACKEND_URI = 'http://localhost:5000/';

const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
};

const Provider = (props) => {
    const client = new ApolloClient({
        uri: BACKEND_URI,
        cache: new InMemoryCache(),
        defaultOptions: defaultOptions,
    });

    return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};

export default Provider;
