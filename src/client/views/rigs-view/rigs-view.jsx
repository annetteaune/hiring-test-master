import React, { useEffect } from "react";
import {
  Breadcrumb,
  Button,
  Flex,
  Heading,
  Page,
  Spacer,
} from "@oliasoft-open-source/react-ui-library";

import { OilRigs } from "client/components/oil-rigs/oil-rigs";
import { useNavigate } from "react-router-dom";

export const RigsView = ({}) => {
  const navigate = useNavigate();
  return (
    <Page left={0}>
      <Flex justifyContent="space-between" alignItems="center">
        <Breadcrumb
          links={[
            {
              label: "Sites",
              onClick: function Xs(navigate) {
                handleBackClick();
              },
            },
            {
              active: true,
              label: `Rigs`,
              url: "sites/rigs",
            },
          ]}
        />
        <Button label="Back to Sites" onClick={() => navigate("/")} />
      </Flex>

      <Spacer />
      <Flex justifyContent="center">
        <OilRigs />
      </Flex>
    </Page>
  );
};
