import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Login from './components/login'
import Dashboard from './components/dashboard'
import ProjectCreation from './components/project-creation'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink} from '@apollo/client';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

// import SuperTokensRequest from 'supertokens-website';

// // interception is on by default
// SuperTokensRequest.init({
//     refreshTokenUrl: "/refresh"
// });

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQLURL,
  // link: new HttpLink({
  //   uri: "/graphql",  // change this depending on your path
  // }),
  cache: new InMemoryCache()
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<App />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/project-creation" element={<ProjectCreation/>}/>
        </Routes>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
