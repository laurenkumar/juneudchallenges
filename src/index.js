import React from 'react';
import ReactDOM from 'react-dom/client';
import SearchDomain from './SearchDomain';
import NavBar from './NavBar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavBar />
    <SearchDomain />
  </React.StrictMode>
);

