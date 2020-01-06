import React from "react";
import Header from "./Header";

const MainLayout = props => (
  <div>
    <Header />
    <main>{props.children}</main>
  </div>
);

export default MainLayout;
