import React from "react";
import {
  Heading,
  Page,
  Spacer,
  Button,
  Flex,
} from "@oliasoft-open-source/react-ui-library";
import { OilRigs } from "client/components/oil-rigs/oil-rigs";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// må ta imot parameter med site-id
// hente data fra store
//vise navn, land
// vise liste over rigger for siten
//tilbake-knapp

//legge til errorstate, laodingstate

export const DetailsPage = ({}) => {
  const { id } = useParams();
  console.log("site id: ", id);

  const navigate = useNavigate();

  const { list } = useSelector((state) => state.entities.sites);
  const currentSite = list.find((site) => site.id === id);

  // back button
  const handleBackClick = () => {
    navigate("/");
  };
  return (
    <Page left={0}>
      <Heading top>Details - {currentSite.name} </Heading>
      <Flex>
        <Button label="Back to site view" onClick={handleBackClick} />
      </Flex>
      <OilRigs />
      <section>
        <h2>{currentSite.name}</h2>
        <p>{currentSite.country}</p>
      </section>
    </Page>
  );
};
