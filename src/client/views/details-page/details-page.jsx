import React, { useEffect } from "react";
import {
  Heading,
  Page,
  Spacer,
  Button,
  Flex,
  Loader,
  Spinner,
} from "@oliasoft-open-source/react-ui-library";
import { OilRigs } from "client/components/oil-rigs/oil-rigs";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sitesLoaded } from "src/client/store/entities/sites/sites";
import styles from "./details-page.module.less";

export const DetailsPage = ({}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { list, loading } = useSelector((state) => state.entities.sites);
  const currentSite = list.find((site) => site.id === id);

  // fetch data upon refresh/empty list
  useEffect(() => {
    if (list.length === 0 && !loading) {
      dispatch(sitesLoaded());
    }
  }, [dispatch, loading]);

  const handleBackClick = () => {
    navigate("/");
  };
  if (loading || !currentSite) {
    return (
      <Page>
        <Loader
          height="100%"
          testId="story-default-spinner"
          text="Loading..."
          theme="white"
          width="100%"
        >
          <Spinner dark />
        </Loader>
      </Page>
    );
  }
  return (
    <Page left={0}>
      <Heading top>Details - {currentSite.name} </Heading>{" "}
      <div className={styles.pageContainer}>
        <section className={styles.infoContainer}>
          <h2>{currentSite.name}</h2>
          <p>{currentSite.country}</p>
        </section>
        <Button label="Back to site view" onClick={handleBackClick} />
      </div>
      <OilRigs siteRigIds={currentSite.oilRigs} />
    </Page>
  );
};

// todo legg til breadcrumb, inkluder back-btn der?
