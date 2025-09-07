import SitesController from "./sites.controller";

export default (server) => {
  const sitesController = new SitesController();
  server.get("/api/sites", sitesController.getSites);
  server.get("/api/sites/:id", sitesController.getSiteById);
  server.get("/api/sites/name/:name", sitesController.getSiteByName);
  server.post("/api/sites", sitesController.addSite);
  server.put("/api/sites/:id", sitesController.updateSite);
  server.patch("/api/sites/:id", sitesController.updateSite); //partial
  server.delete("/api/sites/:id", sitesController.deleteSite);
};
