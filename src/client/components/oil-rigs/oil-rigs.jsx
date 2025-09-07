import React, { useMemo, useState } from "react";
import { connect } from "react-redux";
import {
  Card,
  Heading,
  Column,
  Row,
  Spacer,
  List,
  Accordion,
  Icon,
  Flex,
} from "@oliasoft-open-source/react-ui-library";
import {
  oilRigsLoaded,
  setRigsSortOrder,
} from "store/entities/oil-rigs/oil-rigs";
import styles from "./oil-rigs.module.less";
import { current } from "@reduxjs/toolkit";
import SortControls from "../common/sort-controls/sort-controls";
import LoaderIndicator from "../common/loader-indicator/loader-indicator";
import { useDataFetcher } from "src/client/hooks/useDataFetcher";

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
  const filteredRigs = siteRigIds
    ? list.filter((rig) => siteRigIds.includes(rig.id))
    : list;

  useDataFetcher(list, loading, oilRigsLoaded);

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
                <LoaderIndicator />
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
            <SortControls
              sortOrder={setRigsSortOrder}
              className={styles.sortBtnContainer}
            />
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
                      <LoaderIndicator />
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

const mapStateToProps = ({ entities }) => {
  const { oilRigs } = entities;
  return {
    loading: oilRigs.loading,
    list: oilRigs.list,
    sortOrder: oilRigs.sortOrder,
  };
};

const mapDispatchToProps = {
  oilRigsLoaded,
  setRigsSortOrder,
};

const ConnectedOilRigs = connect(mapStateToProps, mapDispatchToProps)(OilRigs);
export { ConnectedOilRigs as OilRigs };
