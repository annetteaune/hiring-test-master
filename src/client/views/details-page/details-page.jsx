import React, { useEffect } from "react";
import {
  Heading,
  Page,
  Spacer,
  Flex,
  Loader,
  Spinner,
  Card,
  Row,
  Column,
} from "@oliasoft-open-source/react-ui-library";
import { OilRigs } from "client/components/oil-rigs/oil-rigs";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sitesLoaded } from "src/client/store/entities/sites/sites";
import styles from "./details-page.module.less";
import { oilRigs } from "src/server/oil-rigs/oil-rigs.db";
import LoaderIndicator from "src/client/components/common/loader-indicator/loader-indicator";
import PageHeader from "src/client/components/common/page-header/page-header";
import { useDataFetcher } from "src/client/hooks/useDataFetcher";

export const DetailsPage = ({}) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { list, loading } = useSelector((state) => state.entities.sites);
  const currentSite = list.find((site) => site.id === id);

  const validRigs =
    currentSite?.oilRigs?.filter((rigId) =>
      oilRigs.some((rig) => rig.id === rigId)
    ) || [];

  const validRigCount = validRigs.length;

  // fetch data upon refresh/empty list
  useDataFetcher(list, loading, () => dispatch(sitesLoaded()));

  if (loading || !currentSite) {
    return (
      <Page>
        <LoaderIndicator />
      </Page>
    );
  }
  return (
    <Page left={0}>
      <PageHeader
        currentPageLabel={`Details - ${currentSite.name}`}
        currentPageUrl="sites/:id"
      />
      <Spacer />
      <Flex justifyContent="center">
        <div style={{ width: "var(--container-width)" }}>
          <Card bordered padding="true">
            <Heading>Site Information</Heading>
            <Row>
              <Column width="150px">
                <b>Site Name:</b>
              </Column>
              <Column>{currentSite.name}</Column>
            </Row>
            <Row>
              <Column width="150px">
                <b>Country:</b>
              </Column>
              <Column>{currentSite.country}</Column>
            </Row>
            <Row>
              <Column width="150px">
                <b>Number of Rigs:</b>
              </Column>
              <Column>{validRigCount}</Column>
            </Row>
          </Card>
        </div>
      </Flex>
      <Spacer />

      <Flex justifyContent="center">
        <OilRigs siteRigIds={currentSite.oilRigs} currentSite={currentSite} />
      </Flex>
    </Page>
  );
};
