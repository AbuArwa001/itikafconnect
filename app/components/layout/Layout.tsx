import Header from "./header/Header";
import Footer from "./footer/Footer";
import Content from "./content/Content";
// import Sidebar from "./sidebar/Sidebar";

import React, { ReactNode } from "react";
import Navbar from "./navbar/Navbar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div id="main-wrapper">
        <Header />
        <Navbar />
        <Content />
        {/* <Sidebar isExpanded={false} /> */}
        {/* <div className="page-wrapper">
          <div className="container-fluid">{children}</div>
        </div> */}
      </div>
      {children}
      <Footer />
    </>
  );
};

export default Layout;
