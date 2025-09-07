import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Card,
  Heading,
  Column,
  Row,
  Spacer,
  List,
  Accordion,
  Icon,
  Divider,
  Loader,
  Spinner,
  Flex,
} from "@oliasoft-open-source/react-ui-library";
import {
  oilRigsLoaded,
  setRigsSortOrder,
} from "store/entities/oil-rigs/oil-rigs";
import styles from "./oil-rigs.module.less";
import { current } from "@reduxjs/toolkit";

const OilRigs = ({
  list,
  loading,
  oilRigsLoaded,
  variant = "full",
  siteRigIds,
  sortOrder,
  setRigsSortOrder,
  currentSite,
}) => {
  console.log("rigs: ", list);

  const filteredRigs = siteRigIds
    ? list.filter((rig) => siteRigIds.includes(rig.id))
    : list;

  useEffect(() => {
    if (list.length === 0 && !loading) {
      oilRigsLoaded();
    }
  });

  // uses local state instead of redux to avoid all accordions opening at once
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const sortedList = useMemo(() => {
    if (!list || list.length === 0) return [];
    if (sortOrder === "asc") {
      return [...filteredRigs].sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortOrder === "desc") {
      return [...filteredRigs].sort((a, b) => b.name.localeCompare(a.name));
    }
    return filteredRigs;
  }, [filteredRigs, sortOrder]);

  return (
    <>
      {variant === "compact" ? (
        <>
          <article>
            <Accordion
              expanded={expanded}
              heading={
                <Heading
                  onClick={function Xs(expanded) {
                    toggleExpanded();
                  }}
                >
                  Connected Oil Rigs
                </Heading>
              }
            >
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
              ) : filteredRigs.length ? (
                <List
                  list={{
                    items: filteredRigs.map((oilRig, i) => ({
                      id: i,
                      name: oilRig.name,
                    })),
                  }}
                  noHeader
                  scrollDetails={{
                    scrollable: true,
                  }}
                />
              ) : (
                <em>None loaded</em>
              )}
            </Accordion>
          </article>
        </>
      ) : (
        <div style={{ width: "var(--container-width)" }}>
          <Card>
            {" "}
            <div className={styles.sortBtnContainer}>
              <Button
                label={<Icon icon="sort ascending" />}
                onClick={() => setRigsSortOrder("asc")}
              />
              <Button
                label={<Icon icon="sort descending" />}
                onClick={() => setRigsSortOrder("desc")}
              />
              <Button
                label={<Icon icon="undo" />}
                onClick={() => setRigsSortOrder("none")}
              />
            </div>
            <Card
              heading={
                <Heading>
                  {currentSite?.name
                    ? `Oil Rigs at ${currentSite.name}`
                    : "All Oil Rigs"}
                </Heading>
              }
            >
              <Row>
                <Column>
                  {" "}
                  <article>
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
                    ) : sortedList.length ? (
                      <List
                        list={{
                          items: sortedList.map((oilRig, index) => ({
                            id: oilRig.id,
                            name: oilRig.name,
                            details: oilRig.manufacturer,
                            metadata: `Rig ID: ${oilRig.id}`,
                            testId: `oil-rig-item-${oilRig.id}`,
                          })),
                        }}
                        noHeader
                      />
                    ) : (
                      <em>
                        <Icon icon="error" /> No data avaliable
                      </em>
                    )}
                  </article>
                </Column>
              </Row>
            </Card>
          </Card>
        </div>
      )}
    </>
  );
};

//gir tilgang til verdien i sortOrder
const mapStateToProps = ({ entities }) => {
  const { oilRigs } = entities;
  return {
    loading: oilRigs.loading,
    list: oilRigs.list,
    sortOrder: oilRigs.sortOrder,
  };
};

//gir tilgang til action
const mapDispatchToProps = {
  oilRigsLoaded,
  setRigsSortOrder,
};

const ConnectedOilRigs = connect(mapStateToProps, mapDispatchToProps)(OilRigs);
export { ConnectedOilRigs as OilRigs };
