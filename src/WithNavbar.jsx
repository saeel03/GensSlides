import React from 'react';
import Navbar from './Navbar';

const WithNavbar = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

export default WithNavbar;
