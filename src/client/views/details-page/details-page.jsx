import React, { useEffect } from "react";
import {
  Heading,
  Page,
  Spacer,
  Button,
  Flex,
  Loader,
  Spinner,
  Breadcrumb,
  Card,
  Row,
  Column,
} from "@oliasoft-open-source/react-ui-library";
import { OilRigs } from "client/components/oil-rigs/oil-rigs";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sitesLoaded } from "src/client/store/entities/sites/sites";
import styles from "./details-page.module.less";
import { oilRigs } from "src/server/oil-rigs/oil-rigs.db";

export const DetailsPage = ({}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { list, loading } = useSelector((state) => state.entities.sites);
  const currentSite = list.find((site) => site.id === id);

  // fetch data upon refresh/empty list
  useEffect(() => {
    if (list.length === 0 && !loading) {
      dispatch(sitesLoaded());
    }
  }, [dispatch, loading]);

  const handleBackClick = () => {
    navigate("/");
  };

  console.log("rigs ", currentSite.oilRigs);

  if (loading || !currentSite) {
    return (
      <Page>
        <Loader
          height="100%"
          testId="story-default-spinner"
          text="Loading..."
          theme="white"
          width="100%"
        >
          <Spinner dark />
        </Loader>
      </Page>
    );
  }
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
              label: `Details - ${currentSite.name}`,
              url: "sites/:id",
            },
          ]}
        />
        <Button label="Back to Sites" onClick={handleBackClick} />
      </Flex>
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
              <Column>{currentSite.oilRigs?.length || 0}</Column>
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
