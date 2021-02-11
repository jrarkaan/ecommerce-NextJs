import React from 'react';
import Navbar from './Navbar.js';

const Layout = ({ children }) => {
   return (
      <div className="container">
         <Navbar />
         {children}
      </div>
   )
}

export default Layout;
