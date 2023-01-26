import React from "react";
import "./Layout.css";
import logo from "../image/CU_LOGO-COMPLETO-2-1.png";

function Layout({ children }) {
  return (
    <div id="layout-container">
      <img src={logo} alt="" width="50%" />
      <div id="layout-children">{children}</div>
    </div>
  );
}

export default Layout;
