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
  Flex,
  Spacer,
  Card,
} from "@oliasoft-open-source/react-ui-library";
import PageHeader from "src/client/components/common/page-header/page-header";

export const ChartView = () => {
  const { list: sites } = useSelector((state) => state.entities.sites);
  const { list: oilRigs } = useSelector((state) => state.entities.oilRigs);

  const chartData = sites.map((site) => {
    const validRigs =
      site.oilRigs?.filter((rigId) =>
        oilRigs.some((rig) => rig.id === rigId)
      ) || [];

    return {
      name: site.name,
      oilRigs: validRigs.length,
    };
  });

  return (
    <Page left={0}>
      <PageHeader currentPageLabel="Charts" currentPageUrl="sites/chart" />
      <Spacer />
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
