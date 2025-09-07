import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import styles from "./chart-view.module.less";
import { useSelector } from "react-redux";
import {
  Page,
  Heading,
  Button,
  Flex,
  Spacer,
  Card,
  Breadcrumb,
} from "@oliasoft-open-source/react-ui-library";
import { useNavigate } from "react-router-dom";

export const ChartView = () => {
  const navigate = useNavigate();
  const { list: sites } = useSelector((state) => state.entities.sites);

  const chartData = sites.map((site) => ({
    name: site.name,
    oilRigs: site.oilRigs?.length || 0,
  }));

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
              label: `Charts`,
              url: "sites/chart",
            },
          ]}
        />
        <Button label="Back to Sites" onClick={() => navigate("/")} />
      </Flex>

      <Spacer />
      {/* https://recharts.org/en-US/guide/customize https://recharts.org/en-US/storybook */}
      <Card>
        <Heading>Oil Rig Charts</Heading>
        <Flex justifyContent="center">
          <ResponsiveContainer height={500} width="70%">
            <BarChart data={chartData}>
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis
                label={{
                  value: "Number of Oil Rigs",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Bar
                dataKey="oilRigs"
                fill="var(--color-text-primary)"
                barSize={80}
              />
            </BarChart>
          </ResponsiveContainer>
        </Flex>
      </Card>
    </Page>
  );
};
