import { Flex, Page, Spacer } from "@oliasoft-open-source/react-ui-library";
import { OilRigs } from "client/components/oil-rigs/oil-rigs";
import PageHeader from "src/client/components/common/page-header/page-header";

export const RigsView = ({}) => {
  return (
    <Page left={0}>
      <PageHeader currentPageLabel="Rigs" currentPageUrl="sites/rigs" />

      <Spacer />
      <Flex justifyContent="center">
        <OilRigs />
      </Flex>
    </Page>
  );
};
