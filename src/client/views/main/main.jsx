import { Heading, Page } from "@oliasoft-open-source/react-ui-library";
import { Sites } from "client/components/sites/sites";

export const Main = ({}) => {
  return (
    <Page left={0}>
      <Heading top>Sites Overview</Heading>
      <Sites />
    </Page>
  );
};
