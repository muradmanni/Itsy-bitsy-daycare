import './App.css';
import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ChakraProvider } from '@chakra-ui/react'
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './pages/Login';
import NoMatch from './pages/NoMatch';

import CollapsibleExample from './components/Nav';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ChakraProvider>
    <ApolloProvider client={client}>
      
      <Router>
        <div>
          
            <CollapsibleExample />
            <Routes>
              {/* <Route 
                path="/" 
                element={<Home />} 
              /> */}

              <Route 
                path="/login" 
                element={<Login />} 
              />
              <Route 
                path="*" 
                element={<NoMatch />} 
              />
            </Routes>
          
        </div>
      </Router>
      
    </ApolloProvider>
    </ChakraProvider>
  );
}

export default App;
