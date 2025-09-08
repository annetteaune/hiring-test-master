import { TopBar } from "@oliasoft-open-source/react-ui-library";
import Logo from "client/views/images/logo.svg";
import { Link, Route, Routes } from "react-router-dom";

import { Main } from "client/views/main/main";
import { ChartView } from "./chart-view/chart-view";
import { DetailsPage } from "./details-page/details-page";
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
