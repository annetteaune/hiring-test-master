import {
  Button,
  Card,
  Flex,
  Heading,
  Icon,
  Row,
  Spacer,
} from "@oliasoft-open-source/react-ui-library";
import { useMemo } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDataFetcher } from "src/client/hooks/useDataFetcher";
import { setSitesSortOrder, sitesLoaded } from "store/entities/sites/sites";
import LoaderIndicator from "../common/loader-indicator/loader-indicator";
import SortControls from "../common/sort-controls/sort-controls";
import { OilRigs } from "../oil-rigs/oil-rigs";
import styles from "./sites.module.less";

const Sites = ({
  list,
  loading,
  sitesLoaded,
  sortOrder,
  setSitesSortOrder,
}) => {
  const navigate = useNavigate();

  const handleDetailsClick = (siteId) => {
    navigate(`/site/${siteId}`);
  };

  useDataFetcher(list, loading, sitesLoaded);

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
    <div className="wrapper">
      <Card heading={<Heading>List of oil sites</Heading>}>
        <Row>
          <div className={styles.sitesList}>
            <SortControls
              sortOrder={setSitesSortOrder}
              className={styles.sortBtnContainer}
            />
            {loading ? (
              <LoaderIndicator />
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
                        <Flex>
                          <OilRigs
                            variant="compact"
                            siteRigIds={site.oilRigs}
                          />
                        </Flex>
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
                  <Spacer />
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
