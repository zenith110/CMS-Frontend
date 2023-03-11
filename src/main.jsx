import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Login from './components/login'
import Dashboard from './components/dashboard'
import ProjectCreation from './components/project-creation'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import ArticlesView from './components/articles-view'
import ArticleCreation from './components/articles-view/article-creation'
import ArticleView from './components/article-view'
import { createUploadLink } from 'apollo-upload-client';

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQLURL,
  link: createUploadLink({ uri: import.meta.env.VITE_GRAPHQLURL}),
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
          <Route path="/projects/:uuid" element={<ArticlesView/>}/>
          <Route path="/projects/:uuid/article-creation" element={<ArticleCreation/>}/>
          <Route path="/projects/:uuid/articles/:articleuuid" element={<ArticleView/>}/>
        </Routes>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
)
