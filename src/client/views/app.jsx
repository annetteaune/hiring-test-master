import React from "react";
import { Routes, Route } from "react-router-dom";
import { TopBar } from "@oliasoft-open-source/react-ui-library";
import Logo from "client/views/images/logo.svg";

import { Main } from "client/views/main/main";
import { DetailsPage } from "./details-page/details-page";

export const App = () => {
  return (
    <>
      <TopBar
        title={{
          logo: <img src={Logo} alt="logo" style={{ height: 28 }} />,
        }}
      />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="site/:id" element={<DetailsPage />} />
      </Routes>
    </>
  );
};
