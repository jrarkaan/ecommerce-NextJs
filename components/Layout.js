import React from 'react';
import Navbar from './Navbar.js';
import Notify from './Notify.js';
import Modal from './Modal.js';

const Layout = ({ children }) => {
   return (
      <div className="container">
         <Navbar />
         <Notify />
         <Modal />
         {children}
      </div>
   )
}

export default Layout;
