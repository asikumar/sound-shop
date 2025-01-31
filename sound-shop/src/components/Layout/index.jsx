import Header from "../Header";
import Footer from "../Footer";
import { Outlet } from "react-router";
import React from "react";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
export default Layout;
