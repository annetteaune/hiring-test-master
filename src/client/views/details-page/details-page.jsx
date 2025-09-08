import {
  Card,
  Column,
  Flex,
  Heading,
  Page,
  Row,
  Spacer,
} from "@oliasoft-open-source/react-ui-library";
import { oilRigsLoaded } from "src/client/store/entities/oil-rigs/oil-rigs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoaderIndicator from "src/client/components/common/loader-indicator/loader-indicator";
import PageHeader from "src/client/components/common/page-header/page-header";
import { useDataFetcher } from "src/client/hooks/useDataFetcher";
import { sitesLoaded } from "src/client/store/entities/sites/sites";
import { OilRigs } from "client/components/oil-rigs/oil-rigs";

export const DetailsPage = ({}) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { list: sites, loading: sitesLoading } = useSelector(
    (state) => state.entities.sites
  );
  const { list: oilRigs, loading: oilRigsLoading } = useSelector(
    (state) => state.entities.oilRigs
  );

  const currentSite = sites.find((site) => site.id === id);

  const validRigs =
    currentSite?.oilRigs?.filter((rigId) =>
      oilRigs.some((rig) => rig.id === rigId)
    ) || [];

  const validRigCount = validRigs.length;

  useDataFetcher(sites, sitesLoading, () => dispatch(sitesLoaded()));
  useDataFetcher(oilRigs, oilRigsLoading, () => dispatch(oilRigsLoaded()));

  if (sitesLoading || oilRigsLoading || !currentSite) {
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
