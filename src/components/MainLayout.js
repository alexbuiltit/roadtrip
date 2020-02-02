import React from "react";
import Header from "components/Header";

const MainLayout = props => (
  <div>
    <Header />
    <main>{props.children}</main>
  </div>
);

export default MainLayout;
