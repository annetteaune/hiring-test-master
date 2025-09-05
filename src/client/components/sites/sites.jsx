import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Button,
  Card,
  Heading,
  Column,
  Row,
  Flex,
  List,
} from "@oliasoft-open-source/react-ui-library";
import { sitesLoaded } from "store/entities/sites/sites";
import styles from "./sites.module.less";
import { useNavigate } from "react-router-dom";
import { OilRigs } from "../oil-rigs/oil-rigs";

const Sites = ({ list, loading, sitesLoaded }) => {
  const navigate = useNavigate();

  // navigate to details page based on id
  const handleDetailsClick = (siteId) => {
    navigate(`/site/${siteId}`);
  };

  console.log("list ", list);
  useEffect(() => {
    if (list.length === 0 && !loading) {
      sitesLoaded();
    }
  });

  return (
    <Card heading={<Heading>List of oil sites</Heading>}>
      <Row>
        <div className={styles.sitesList}>
          {list.length ? (
            <ul>
              <Flex gap="var(--padding)" justifyContent="space-evenly">
                {list.map((site, i) => (
                  <li key={i}>
                    <Card
                      bordered
                      padding="true"
                      heading={
                        <Heading>
                          {site.name} - {site.country}
                        </Heading>
                      }
                    >
                      <section className={styles.cardContent}>
                        <OilRigs variant="compact" siteRigIds={site.oilRigs} />
                      </section>
                      <section className={styles.btnContainer}>
                        <Button
                          label="See details"
                          onClick={() => handleDetailsClick(site.id)}
                        />
                      </section>
                    </Card>
                  </li>
                ))}
                *
              </Flex>
            </ul>
          ) : (
            <em>None loaded</em>
          )}
        </div>
      </Row>
    </Card>
  );
};

const mapStateToProps = ({ entities }) => {
  const { sites } = entities;
  return {
    loading: sites.loading,
    list: sites.list,
  };
};

const mapDispatchToProps = {
  sitesLoaded,
};

const ConnectedSites = connect(mapStateToProps, mapDispatchToProps)(Sites);
export { ConnectedSites as Sites };
