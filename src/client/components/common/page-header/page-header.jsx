import {
  Flex,
  Breadcrumb,
  Button,
} from "@oliasoft-open-source/react-ui-library";
import { useNavigate } from "react-router-dom";

const PageHeader = ({ currentPageLabel, currentPageUrl }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  const breadcrumbLinks = [
    {
      label: "Sites",
      onClick: handleBackClick,
    },
    {
      active: true,
      label: currentPageLabel,
      url: currentPageUrl,
    },
  ];

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Breadcrumb links={breadcrumbLinks} />
      <Button label="Back to Sites" onClick={handleBackClick} />
    </Flex>
  );
};

export default PageHeader;
