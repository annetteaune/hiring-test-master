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
} from "@oliasoft-open-source/react-ui-library";
import {
  oilRigsLoaded,
  setRigsExpanded,
  setRigsSortOrder,
} from "store/entities/oil-rigs/oil-rigs";
import styles from "./oil-rigs.module.less";

const OilRigs = ({
  list,
  loading,
  oilRigsLoaded,
  variant = "full",
  siteRigIds,
  expanded,
  setRigsExpanded,
  sortOrder,
  setRigsSortOrder,
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

  const toggleExpanded = () => {
    setRigsExpanded(!expanded);
  };

  const sortedList = useMemo(() => {
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
        <div className={styles.listContainer}>
          <Card heading={<Heading>List of oil rigs</Heading>}>
            <Row>
              <Column>
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
    expanded: oilRigs.expanded,
    sortOrder: oilRigs.sortOrder,
  };
};

//gir tilgang til action
const mapDispatchToProps = {
  oilRigsLoaded,
  setRigsExpanded,
  setRigsSortOrder,
};

const ConnectedOilRigs = connect(mapStateToProps, mapDispatchToProps)(OilRigs);
export { ConnectedOilRigs as OilRigs };
