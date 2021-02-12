import React from 'react';
import Navbar from './Navbar.js';
import Notify from './Notify.js';

const Layout = ({ children }) => {
   return (
      <div className="container">
         <Navbar />
         <Notify />
         {children}
      </div>
   )
}

export default Layout;
