import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { TopBar } from "@oliasoft-open-source/react-ui-library";
import Logo from "client/views/images/logo.svg";

import { Main } from "client/views/main/main";
import { DetailsPage } from "./details-page/details-page";
import { ChartView } from "./chart-view/chart-view";
import { RigsView } from "./rigs-view/rigs-view";

export const App = () => {
  return (
    <>
      <TopBar
        title={{
          logo: <img src={Logo} alt="logo" style={{ height: 28 }} />,
        }}
        contentRight={[
          {
            label: "Sites",
            component: Link,
            url: "/",
            type: "Link",
          },
          {
            label: "Rigs",
            component: Link,
            url: "/rigs",
            type: "Link",
          },
          {
            label: "Charts",
            component: Link,
            url: "/chart",
            type: "Link",
          },
        ]}
      />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="site/:id" element={<DetailsPage />} />
        <Route path="/chart" element={<ChartView />} />
        <Route path="/rigs" element={<RigsView />} />
      </Routes>
    </>
  );
};
