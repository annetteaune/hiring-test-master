import {
  Card,
  Column,
  Flex,
  Heading,
  Icon,
  Row,
  Spacer,
  Text,
} from "@oliasoft-open-source/react-ui-library";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadAllStatistics } from "src/client/store/entities/data/data";
import LoaderIndicator from "../loader-indicator/loader-indicator";

const Statistics = () => {
  const dispatch = useDispatch();

  const { sites, rigs, loading } = useSelector((state) => state.entities.data);
  useEffect(() => {
    if (!sites || !rigs) {
      dispatch(loadAllStatistics());
    }
  }, [dispatch, sites, rigs]);

  if (loading) {
    return (
      <Card>
        <LoaderIndicator />
      </Card>
    );
  }

  return (
    <Card>
      <Heading icon={<Icon icon="chart bar" />}>Statistics Overview</Heading>
      <Spacer />
      <Flex justifyContent="center">
        <Row flex="wrap">
          <Column>
            <Flex justifyContent="center">
              Total Sites: <b>{sites?.totalSites || "n/a"}</b>
            </Flex>
          </Column>
          <Column>
            <Flex justifyContent="center">
              Norwegian Sites: <b>{sites?.norwegianSites || "n/a"}</b>
            </Flex>
          </Column>
          <Column>
            <Flex justifyContent="center">
              Total Rigs: <b>{rigs?.totalRigs || "n/a"}</b>
            </Flex>
          </Column>
          <Column>
            <Flex justifyContent="center">
              Norwegian Rigs: <b>{rigs?.norwegianRigs || "n/a"}</b>
            </Flex>
          </Column>
        </Row>
      </Flex>
    </Card>
  );
};

export default Statistics;
