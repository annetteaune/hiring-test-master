import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import {
  Button,
  Card,
  Heading,
  Column,
  Row,
  Flex,
  List,
  Icon,
  Loader,
  Spinner,
  Spacer,
} from "@oliasoft-open-source/react-ui-library";
import { setSitesSortOrder, sitesLoaded } from "store/entities/sites/sites";
import styles from "./sites.module.less";
import { useNavigate } from "react-router-dom";
import { OilRigs } from "../oil-rigs/oil-rigs";

const Sites = ({
  list,
  loading,
  sitesLoaded,
  sortOrder,
  setSitesSortOrder,
}) => {
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

  const sortedList = useMemo(() => {
    if (sortOrder === "asc") {
      return [...list].sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortOrder === "desc") {
      return [...list].sort((a, b) => b.name.localeCompare(a.name));
    }
    return list;
  }, [list, sortOrder]);

  return (
    <div className={styles.listContainer}>
      <Card heading={<Heading>List of oil sites</Heading>}>
        <Row>
          <div className={styles.sitesList}>
            <div className={styles.sortBtnContainer}>
              <Button
                label={<Icon icon="sort ascending" />}
                onClick={() => setSitesSortOrder("asc")}
              />
              <Button
                label={<Icon icon="sort descending" />}
                onClick={() => setSitesSortOrder("desc")}
              />
              <Button
                label={<Icon icon="undo" />}
                onClick={() => setSitesSortOrder("none")}
              />
            </div>
            {loading ? (
              <Loader
                height="100%"
                testId="story-default-spinner"
                text="Loading..."
                theme="white"
                width="100%"
              >
                <Spinner dark />
              </Loader>
            ) : list.length ? (
              <ul>
                <Flex
                  gap="var(--padding)"
                  justifyContent="space-evenly"
                  direction="column"
                >
                  {sortedList.map((site, i) => (
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
                          <OilRigs
                            variant="compact"
                            siteRigIds={site.oilRigs}
                          />
                        </section>
                        <Spacer />
                        <Flex justifyContent="center">
                          <Button
                            label="See details"
                            onClick={() => handleDetailsClick(site.id)}
                          />
                        </Flex>
                      </Card>
                    </li>
                  ))}
                </Flex>
              </ul>
            ) : (
              <em>
                <Icon icon="error" /> No data avaliable
              </em>
            )}
          </div>
        </Row>
      </Card>
    </div>
  );
};

const mapStateToProps = ({ entities }) => {
  const { sites } = entities;
  return {
    loading: sites.loading,
    list: sites.list,
    sortOrder: sites.sortOrder,
  };
};

const mapDispatchToProps = {
  sitesLoaded,
  setSitesSortOrder,
};

const ConnectedSites = connect(mapStateToProps, mapDispatchToProps)(Sites);
export { ConnectedSites as Sites };
