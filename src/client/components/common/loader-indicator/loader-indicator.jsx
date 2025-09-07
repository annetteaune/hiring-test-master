import { Loader, Spinner } from "@oliasoft-open-source/react-ui-library";

const LoaderIndicator = ({ text = "Loading..." }) => (
  <Loader
    height="100%"
    testId="story-default-spinner"
    text={text}
    theme="white"
    width="100%"
  >
    <Spinner dark />
  </Loader>
);

export default LoaderIndicator;
