import {
  Card,
  Flex,
  Heading,
  Page,
  Spacer,
} from "@oliasoft-open-source/react-ui-library";
import { useDispatch, useSelector } from "react-redux";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import LoaderIndicator from "src/client/components/common/loader-indicator/loader-indicator";
import PageHeader from "src/client/components/common/page-header/page-header";
import Statistics from "src/client/components/common/stats/stats";
import { useDataFetcher } from "src/client/hooks/useDataFetcher";
import { oilRigsLoaded } from "src/client/store/entities/oil-rigs/oil-rigs";
import { sitesLoaded } from "src/client/store/entities/sites/sites";
import styles from "./chart-view.module.less";

export const ChartView = () => {
  const dispatch = useDispatch();
  const { list: sites, loading: sitesLoading } = useSelector(
    (state) => state.entities.sites
  );
  const { list: oilRigs, loading: oilRigsLoading } = useSelector(
    (state) => state.entities.oilRigs
  );

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

  useDataFetcher(sites, sitesLoading, () => dispatch(sitesLoaded()));
  useDataFetcher(oilRigs, oilRigsLoading, () => dispatch(oilRigsLoaded()));

  return (
    <Page left={0}>
      <PageHeader currentPageLabel="Charts" currentPageUrl="sites/chart" />
      <Spacer />

      <div className="wrapper">
        <Statistics />
        <Spacer />
        <Card>
          <Heading>Oil Rig Charts</Heading>
          {sitesLoading || oilRigsLoading ? (
            <Flex justifyContent="center">
              <LoaderIndicator />
            </Flex>
          ) : (
            <Flex justifyContent="center">
              <ResponsiveContainer height={500} className={styles.barContainer}>
                <BarChart data={chartData}>
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="name" />
                  <YAxis
                    label={{
                      value: "Number of Oil Rigs",
                      angle: -90,
                      position: "outsideLeft",
                    }}
                  />

                  <Bar
                    dataKey="oilRigs"
                    fill="var(--color-text-primary)"
                    barSize={80}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Flex>
          )}
        </Card>
      </div>
    </Page>
  );
};
