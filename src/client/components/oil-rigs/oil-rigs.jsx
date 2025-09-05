import React, { useEffect, useState } from "react";
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
} from "@oliasoft-open-source/react-ui-library";
import { oilRigsLoaded } from "store/entities/oil-rigs/oil-rigs";
import styles from "./oil-rigs.module.less";

const OilRigs = ({
  list,
  loading,
  oilRigsLoaded,
  variant = "full",
  siteRigIds,
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

  // todo redux
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

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
              {filteredRigs.length ? (
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
        <Card heading={<Heading>List of oil rigs</Heading>}>
          <Row>
            <Column>
              <article>
                {/*todo - implement list w/details: https://oliasoft-open-source.gitlab.io/react-ui-library/storybook/?path=/docs/basic-list--docs */}
                {filteredRigs.length ? (
                  <ul>
                    {filteredRigs.map((oilRig, i) => (
                      <li key={i}>
                        <span>{oilRig.name}</span> <span> - </span>
                        <span>{oilRig.manufacturer}</span>
                        <Spacer />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <em>None loaded</em>
                )}
              </article>
            </Column>
          </Row>
        </Card>
      )}
    </>
  );
};

const mapStateToProps = ({ entities }) => {
  const { oilRigs } = entities;
  return {
    loading: oilRigs.loading,
    list: oilRigs.list,
  };
};

const mapDispatchToProps = {
  oilRigsLoaded,
};

const ConnectedOilRigs = connect(mapStateToProps, mapDispatchToProps)(OilRigs);
export { ConnectedOilRigs as OilRigs };
