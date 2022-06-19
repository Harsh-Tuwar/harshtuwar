import React from 'react';
import NavBar from './Navbar';
import Footer from './Footer';
import DottedSvgs from './DottedSvgs';

const Layout = ({ children }) => {
    return (
        <>
            <NavBar />
            <DottedSvgs />
            <main>{children}</main>
            <Footer />
        </>
    );
}

export default Layout;
